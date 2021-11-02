const base_player = { hp: 50, atk: 0, def: 0, mp: 500, spent: 0, effects: [], spells: [] };
const base_boss = { hp: 55, atk: 8, def: 0 };

// P, R, S, P, R, D, P, D, M = 1289
const spells = [
    { id: 'm', cost: 53,  atk: 4, heal: 0, def: 0, regen: 0,   timer: 1 },
    { id: 'd', cost: 73,  atk: 2, heal: 2, def: 0, regen: 0,   timer: 1 },
    { id: 's', cost: 113, atk: 0, heal: 0, def: 7, regen: 0,   timer: 6 },
    { id: 'p', cost: 173, atk: 3, heal: 0, def: 0, regen: 0,   timer: 6 },
    { id: 'r', cost: 229, atk: 0, heal: 0, def: 0, regen: 101, timer: 5 }
];

console.log(spells);

function applyeffect(player, boss)
{
    player.def = 0;
    for (const effect of player.effects)
    {
        if (effect[0] === 's')
        {
            player.def = spells.filter(x => x.id === 's')[0].def;
        }
        else if (effect[0] === 'p')
        {
            boss.hp -= spells.filter(x => x.id === 'p')[0].atk;
        }
        else if (effect[0] === 'r')
        {
            player.mp += spells.filter(x => x.id === 'r')[0].regen;
        }
    }
    player.effects = player.effects.map(x => [x[0], x[1]-1]).filter(x => x[1] > 0);
}

function playerturn(player, boss, spell)
{
    player.hp--;

    applyeffect(player, boss);

    if (boss.hp <= 0)
    {
        return player.spent;
    }

    if (spell.id === 'm')
    {
        boss.hp -= spell.atk;
    }
    else if (spell.id === 'd')
    {
        boss.hp -= spell.atk;
        player.hp += spell.heal;
    }
    else {
        player.effects.push([spell.id, spell.timer]);
    }
    player.spent += spell.cost;
    player.mp -= spell.cost;
    player.spells.push(spell.id);

    if (boss.hp <= 0)
    {
        return player.spent;
    }
    
    return -1;
}

function bossturn(player, boss)
{
    applyeffect(player, boss);

    if (boss.hp <= 0)
    {
        return player.spent;
    }

    player.hp -= Math.max(1, boss.atk - player.def);

    return -1;
}

function battle(player, boss, min=10000)
{
    if (boss.hp <= 0)
    {
        return player.spent;
    }
    if (player.hp <= 1)
    {
        return 10000;
    }
    if (player.spent > 1500)
    {
        return 10000;
    }
    
    let results = [[10000,-1]];
    for (const spell of spells)
    {
        if (player.spent + spell.cost > Math.min(...results, min)
            || player.effects.filter(x => (x[0] === spell.id && x[1] > 1)).length > 0 
            || player.mp <= spell.cost)
        {
            continue;
        }

        // duplicate player and boss to not affect given objects
        let p = Object.create(player);
        let b = Object.create(boss);
        p.effects = new Array();
        for (const e of player.effects)
        {
            p.effects.push(new Array());
            for (const o of e)
            {
                p.effects[p.effects.length-1].push(o);
            }
        }
        p.spells = new Array();
        for (const e of player.spells)
        {
            p.spells.push(e);
        }

        let result = playerturn(p, b, spell);
        if (result > 0)
        {
            return [result, p.spells];
        }
        
        result = bossturn(p, b);
        if (result > 0)
        {
            // console.log(spell);
            // console.log(`Player: ${p.spells[0]} ${p.hp}/${player.hp}HP, ${p.mp}/${player.mp}MP ${p.spent}/${player.spent} used ${p.effects}/${player.effects}`);
            // console.log(`Boss: ${b.hp}/${boss.hp}`);
            results.push([p.spent,p.spells]);
            continue;
        }

        if (p.hp <= 0)
        {
            // console.log(spell);
            // console.log(`Player: ${p.spells[0]} ${p.hp}/${player.hp}HP, ${p.mp}/${player.mp}MP ${p.spent}/${player.spent} used ${p.effects}/${player.effects}`);
            // console.log(`Boss: ${b.hp}/${boss.hp}`);
            results.push([10000,-1]);
            continue;
        }

        // console.log(spell);
        // console.log(`Player: ${p.spells[0]} ${p.hp}/${player.hp}HP, ${p.mp}/${player.mp}MP ${p.spent}/${player.spent} used ${p.effects}/${player.effects}`);
        // console.log(`Boss: ${b.hp}/${boss.hp}`);
        let newmin = min;
        for (const r of results)
        {
            if (r[0] < min)
            {
                newmin = r[0];
            }
        }
        results.push(battle(p, b, newmin));
    }
    // console.log(results);
    let list = [];
    let newmin = 10000;
    for (const r of results)
    {
        if (r[0] < newmin)
        {
            list = r[1];
            newmin = r[0];
        }
    }
    // if (newmin !== 10000)
        // console.log(newmin + ": " + list);
    return [newmin, list];
}

console.log(battle(base_player, base_boss, 10000));
console.log(base_player);
console.log(base_boss);