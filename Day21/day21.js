const path = require('path');
const fs = require('fs');

const boss = {hp: 104, atk: 8, def: 1 };

const store = {
    weapons: [
        { id: 'dagger', cost: 8, atk: 4, def: 0},
        { id: 'shortsword', cost: 10, atk: 5, def: 0},
        { id: 'warhammer', cost: 25, atk: 6, def: 0},
        { id: 'longsword', cost: 40, atk: 7, def: 0},
        { id: 'greataxe', cost: 74, atk: 8, def: 0}
    ],
    armor: [
        { id: 'leather', cost: 13, atk: 0, def: 1},
        { id: 'chainmail', cost: 31, atk: 0, def: 2},
        { id: 'splintmail', cost: 53, atk: 0, def: 3},
        { id: 'bandedmail', cost: 75, atk: 0, def: 4},
        { id: 'platemail', cost: 102, atk: 0, def: 5}
    ],
    rings: [
        { id: 'atk +1', cost: 25, atk: 1, def: 0},
        { id: 'atk +2', cost: 50, atk: 2, def: 0},
        { id: 'atk +3', cost: 100, atk: 3, def: 0},
        { id: 'def +1', cost: 20, atk: 0, def: 1},
        { id: 'def +2', cost: 40, atk: 0, def: 2},
        { id: 'def +3', cost: 80, atk: 0, def: 3}
    ]
}

let player = {hp: 100, atk: 0, def:0 };

function doesPlayerWin()
{
    let playerattack = Math.max(1, player.atk - boss.def);
    let bossattack = Math.max(1, boss.atk - player.def);

    playerrounds = Math.ceil(boss.hp / playerattack);
    bossrounds = Math.ceil(player.hp / bossattack);

    // console.log('Player: ' + playerrounds + ', Boss: ' + bossrounds);

    return playerrounds <= bossrounds;
}

const itempermutations = [
    [0, -1, -1, -1],
    [1, -1, -1, -1],
    [2, -1, -1, -1],
    [3, -1, -1, -1],
    [4, -1, -1, -1],
    [0, 0, -1, -1],
    [0, 1, -1, -1],
    [0, 2, -1, -1],
    [0, 3, -1, -1],
    [0, 4, -1, -1],
    [0, -1, 0, -1],
    [0, -1, 1, -1],
    [0, -1, 2, -1],
    [0, -1, 3, -1],
    [0, -1, 4, -1],
    [0, -1, 0, 1],
    [0, -1, 0, 2],
    [0, -1, 0, 3],
    [0, -1, 0, 4],
    [0, -1, 1, 2],
    [0, -1, 1, 3],
    [0, -1, 1, 4],
    [0, -1, 2, 3],
    [0, -1, 2, 4],
    [0, -1, 3, 4],
    [0, 0, 0, -1],
    [0, 0, 1, -1],
    [0, 0, 2, -1],
    [0, 0, 3, -1],
    [0, 0, 4, -1],
    [0, 0, 0, 1],
    [0, 0, 0, 2],
    [0, 0, 0, 3],
    [0, 0, 0, 4],
    [0, 0, 1, 2],
    [0, 0, 1, 3],
    [0, 0, 1, 4],
    [0, 0, 2, 3],
    [0, 0, 2, 4],
    [0, 0, 3, 4],
    [0, 1, 0, -1],
    [0, 1, 1, -1],
    [0, 1, 2, -1],
    [0, 1, 3, -1],
    [0, 1, 4, -1],
    [0, 1, 0, 1],
    [0, 1, 0, 2],
    [0, 1, 0, 3],
    [0, 1, 0, 4],
    [0, 1, 1, 2],
    [0, 1, 1, 3],
    [0, 1, 1, 4],
    [0, 1, 2, 3],
    [0, 1, 2, 4],
    [0, 1, 3, 4],
    [0, 2, 0, -1],
    [0, 2, 1, -1],
    [0, 2, 2, -1],
    [0, 2, 3, -1],
    [0, 2, 4, -1],
    [0, 2, 0, 1],
    [0, 2, 0, 2],
    [0, 2, 0, 3],
    [0, 2, 0, 4],
    [0, 2, 1, 2],
    [0, 2, 1, 3],
    [0, 2, 1, 4],
    [0, 2, 2, 3],
    [0, 2, 2, 4],
    [0, 2, 3, 4],
    [0, 3, 0, -1],
    [0, 3, 1, -1],
    [0, 3, 2, -1],
    [0, 3, 3, -1],
    [0, 3, 4, -1],
    [0, 3, 0, 1],
    [0, 3, 0, 2],
    [0, 3, 0, 3],
    [0, 3, 0, 4],
    [0, 3, 1, 2],
    [0, 3, 1, 3],
    [0, 3, 1, 4],
    [0, 3, 2, 3],
    [0, 3, 2, 4],
    [0, 3, 3, 4],
    [0, 4, 0, -1],
    [0, 4, 1, -1],
    [0, 4, 2, -1],
    [0, 4, 3, -1],
    [0, 4, 4, -1],
    [0, 4, 0, 1],
    [0, 4, 0, 2],
    [0, 4, 0, 3],
    [0, 4, 0, 4],
    [0, 4, 1, 2],
    [0, 4, 1, 3],
    [0, 4, 1, 4],
    [0, 4, 2, 3],
    [0, 4, 2, 4],
    [0, 4, 3, 4],
    [0, 0, -1, -1],
    [0, 1, -1, -1],
    [0, 2, -1, -1],
    [0, 3, -1, -1],
    [0, 4, -1, -1],
    [1, -1, 0, -1],
    [1, -1, 1, -1],
    [1, -1, 2, -1],
    [1, -1, 3, -1],
    [1, -1, 4, -1],
    [1, -1, 0, 1],
    [1, -1, 0, 2],
    [1, -1, 0, 3],
    [1, -1, 0, 4],
    [1, -1, 1, 2],
    [1, -1, 1, 3],
    [1, -1, 1, 4],
    [1, -1, 2, 3],
    [1, -1, 2, 4],
    [1, -1, 3, 4],
    [1, 0, 0, -1],
    [1, 0, 1, -1],
    [1, 0, 2, -1],
    [1, 0, 3, -1],
    [1, 0, 4, -1],
    [1, 0, 0, 1],
    [1, 0, 0, 2],
    [1, 0, 0, 3],
    [1, 0, 0, 4],
    [1, 0, 1, 2],
    [1, 0, 1, 3],
    [1, 0, 1, 4],
    [1, 0, 2, 3],
    [1, 0, 2, 4],
    [1, 0, 3, 4],
    [1, 1, 0, -1],
    [1, 1, 1, -1],
    [1, 1, 2, -1],
    [1, 1, 3, -1],
    [1, 1, 4, -1],
    [1, 1, 0, 1],
    [1, 1, 0, 2],
    [1, 1, 0, 3],
    [1, 1, 0, 4],
    [1, 1, 1, 2],
    [1, 1, 1, 3],
    [1, 1, 1, 4],
    [1, 1, 2, 3],
    [1, 1, 2, 4],
    [1, 1, 3, 4],
    [1, 2, 0, -1],
    [1, 2, 1, -1],
    [1, 2, 2, -1],
    [1, 2, 3, -1],
    [1, 2, 4, -1],
    [1, 2, 0, 1],
    [1, 2, 0, 2],
    [1, 2, 0, 3],
    [1, 2, 0, 4],
    [1, 2, 1, 2],
    [1, 2, 1, 3],
    [1, 2, 1, 4],
    [1, 2, 2, 3],
    [1, 2, 2, 4],
    [1, 2, 3, 4],
    [1, 3, 0, -1],
    [1, 3, 1, -1],
    [1, 3, 2, -1],
    [1, 3, 3, -1],
    [1, 3, 4, -1],
    [1, 3, 0, 1],
    [1, 3, 0, 2],
    [1, 3, 0, 3],
    [1, 3, 0, 4],
    [1, 3, 1, 2],
    [1, 3, 1, 3],
    [1, 3, 1, 4],
    [1, 3, 2, 3],
    [1, 3, 2, 4],
    [1, 3, 3, 4],
    [1, 4, 0, -1],
    [1, 4, 1, -1],
    [1, 4, 2, -1],
    [1, 4, 3, -1],
    [1, 4, 4, -1],
    [1, 4, 0, 1],
    [1, 4, 0, 2],
    [1, 4, 0, 3],
    [1, 4, 0, 4],
    [1, 4, 1, 2],
    [1, 4, 1, 3],
    [1, 4, 1, 4],
    [1, 4, 2, 3],
    [1, 4, 2, 4],
    [1, 4, 3, 4],
    [2, 0, -1, -1],
    [2, 1, -1, -1],
    [2, 2, -1, -1],
    [2, 3, -1, -1],
    [2, 4, -1, -1],
    [2, -1, 0, -1],
    [2, -1, 1, -1],
    [2, -1, 2, -1],
    [2, -1, 3, -1],
    [2, -1, 4, -1],
    [2, -1, 0, 1],
    [2, -1, 0, 2],
    [2, -1, 0, 3],
    [2, -1, 0, 4],
    [2, -1, 1, 2],
    [2, -1, 1, 3],
    [2, -1, 1, 4],
    [2, -1, 2, 3],
    [2, -1, 2, 4],
    [2, -1, 3, 4],
    [2, 0, 0, -1],
    [2, 0, 1, -1],
    [2, 0, 2, -1],
    [2, 0, 3, -1],
    [2, 0, 4, -1],
    [2, 0, 0, 1],
    [2, 0, 0, 2],
    [2, 0, 0, 3],
    [2, 0, 0, 4],
    [2, 0, 1, 2],
    [2, 0, 1, 3],
    [2, 0, 1, 4],
    [2, 0, 2, 3],
    [2, 0, 2, 4],
    [2, 0, 3, 4],
    [2, 1, 0, -1],
    [2, 1, 1, -1],
    [2, 1, 2, -1],
    [2, 1, 3, -1],
    [2, 1, 4, -1],
    [2, 1, 0, 1],
    [2, 1, 0, 2],
    [2, 1, 0, 3],
    [2, 1, 0, 4],
    [2, 1, 1, 2],
    [2, 1, 1, 3],
    [2, 1, 1, 4],
    [2, 1, 2, 3],
    [2, 1, 2, 4],
    [2, 1, 3, 4],
    [2, 2, 0, -1],
    [2, 2, 1, -1],
    [2, 2, 2, -1],
    [2, 2, 3, -1],
    [2, 2, 4, -1],
    [2, 2, 0, 1],
    [2, 2, 0, 2],
    [2, 2, 0, 3],
    [2, 2, 0, 4],
    [2, 2, 1, 2],
    [2, 2, 1, 3],
    [2, 2, 1, 4],
    [2, 2, 2, 3],
    [2, 2, 2, 4],
    [2, 2, 3, 4],
    [2, 3, 0, -1],
    [2, 3, 1, -1],
    [2, 3, 2, -1],
    [2, 3, 3, -1],
    [2, 3, 4, -1],
    [2, 3, 0, 1],
    [2, 3, 0, 2],
    [2, 3, 0, 3],
    [2, 3, 0, 4],
    [2, 3, 1, 2],
    [2, 3, 1, 3],
    [2, 3, 1, 4],
    [2, 3, 2, 3],
    [2, 3, 2, 4],
    [2, 3, 3, 4],
    [2, 4, 0, -1],
    [2, 4, 1, -1],
    [2, 4, 2, -1],
    [2, 4, 3, -1],
    [2, 4, 4, -1],
    [2, 4, 0, 1],
    [2, 4, 0, 2],
    [2, 4, 0, 3],
    [2, 4, 0, 4],
    [2, 4, 1, 2],
    [2, 4, 1, 3],
    [2, 4, 1, 4],
    [2, 4, 2, 3],
    [2, 4, 2, 4],
    [2, 4, 3, 4],
    [3, 0, -1, -1],
    [3, 1, -1, -1],
    [3, 2, -1, -1],
    [3, 3, -1, -1],
    [3, 4, -1, -1],
    [3, -1, 0, -1],
    [3, -1, 1, -1],
    [3, -1, 2, -1],
    [3, -1, 3, -1],
    [3, -1, 4, -1],
    [3, -1, 0, 1],
    [3, -1, 0, 2],
    [3, -1, 0, 3],
    [3, -1, 0, 4],
    [3, -1, 1, 2],
    [3, -1, 1, 3],
    [3, -1, 1, 4],
    [3, -1, 2, 3],
    [3, -1, 2, 4],
    [3, -1, 3, 4],
    [3, 0, 0, -1],
    [3, 0, 1, -1],
    [3, 0, 2, -1],
    [3, 0, 3, -1],
    [3, 0, 4, -1],
    [3, 0, 0, 1],
    [3, 0, 0, 2],
    [3, 0, 0, 3],
    [3, 0, 0, 4],
    [3, 0, 1, 2],
    [3, 0, 1, 3],
    [3, 0, 1, 4],
    [3, 0, 2, 3],
    [3, 0, 2, 4],
    [3, 0, 3, 4],
    [3, 1, 0, -1],
    [3, 1, 1, -1],
    [3, 1, 2, -1],
    [3, 1, 3, -1],
    [3, 1, 4, -1],
    [3, 1, 0, 1],
    [3, 1, 0, 2],
    [3, 1, 0, 3],
    [3, 1, 0, 4],
    [3, 1, 1, 2],
    [3, 1, 1, 3],
    [3, 1, 1, 4],
    [3, 1, 2, 3],
    [3, 1, 2, 4],
    [3, 1, 3, 4],
    [3, 2, 0, -1],
    [3, 2, 1, -1],
    [3, 2, 2, -1],
    [3, 2, 3, -1],
    [3, 2, 4, -1],
    [3, 2, 0, 1],
    [3, 2, 0, 2],
    [3, 2, 0, 3],
    [3, 2, 0, 4],
    [3, 2, 1, 2],
    [3, 2, 1, 3],
    [3, 2, 1, 4],
    [3, 2, 2, 3],
    [3, 2, 2, 4],
    [3, 2, 3, 4],
    [3, 3, 0, -1],
    [3, 3, 1, -1],
    [3, 3, 2, -1],
    [3, 3, 3, -1],
    [3, 3, 4, -1],
    [3, 3, 0, 1],
    [3, 3, 0, 2],
    [3, 3, 0, 3],
    [3, 3, 0, 4],
    [3, 3, 1, 2],
    [3, 3, 1, 3],
    [3, 3, 1, 4],
    [3, 3, 2, 3],
    [3, 3, 2, 4],
    [3, 3, 3, 4],
    [3, 4, 0, -1],
    [3, 4, 1, -1],
    [3, 4, 2, -1],
    [3, 4, 3, -1],
    [3, 4, 4, -1],
    [3, 4, 0, 1],
    [3, 4, 0, 2],
    [3, 4, 0, 3],
    [3, 4, 0, 4],
    [3, 4, 1, 2],
    [3, 4, 1, 3],
    [3, 4, 1, 4],
    [3, 4, 2, 3],
    [3, 4, 2, 4],
    [3, 4, 3, 4],
    [4, 0, -1, -1],
    [4, 1, -1, -1],
    [4, 2, -1, -1],
    [4, 3, -1, -1],
    [4, 4, -1, -1],
    [4, -1, 0, -1],
    [4, -1, 1, -1],
    [4, -1, 2, -1],
    [4, -1, 3, -1],
    [4, -1, 4, -1],
    [4, -1, 0, 1],
    [4, -1, 0, 2],
    [4, -1, 0, 3],
    [4, -1, 0, 4],
    [4, -1, 1, 2],
    [4, -1, 1, 3],
    [4, -1, 1, 4],
    [4, -1, 2, 3],
    [4, -1, 2, 4],
    [4, -1, 3, 4],
    [4, 0, 0, -1],
    [4, 0, 1, -1],
    [4, 0, 2, -1],
    [4, 0, 3, -1],
    [4, 0, 4, -1],
    [4, 0, 0, 1],
    [4, 0, 0, 2],
    [4, 0, 0, 3],
    [4, 0, 0, 4],
    [4, 0, 1, 2],
    [4, 0, 1, 3],
    [4, 0, 1, 4],
    [4, 0, 2, 3],
    [4, 0, 2, 4],
    [4, 0, 3, 4],
    [4, 1, 0, -1],
    [4, 1, 1, -1],
    [4, 1, 2, -1],
    [4, 1, 3, -1],
    [4, 1, 4, -1],
    [4, 1, 0, 1],
    [4, 1, 0, 2],
    [4, 1, 0, 3],
    [4, 1, 0, 4],
    [4, 1, 1, 2],
    [4, 1, 1, 3],
    [4, 1, 1, 4],
    [4, 1, 2, 3],
    [4, 1, 2, 4],
    [4, 1, 3, 4],
    [4, 2, 0, -1],
    [4, 2, 1, -1],
    [4, 2, 2, -1],
    [4, 2, 3, -1],
    [4, 2, 4, -1],
    [4, 2, 0, 1],
    [4, 2, 0, 2],
    [4, 2, 0, 3],
    [4, 2, 0, 4],
    [4, 2, 1, 2],
    [4, 2, 1, 3],
    [4, 2, 1, 4],
    [4, 2, 2, 3],
    [4, 2, 2, 4],
    [4, 2, 3, 4],
    [4, 3, 0, -1],
    [4, 3, 1, -1],
    [4, 3, 2, -1],
    [4, 3, 3, -1],
    [4, 3, 4, -1],
    [4, 3, 0, 1],
    [4, 3, 0, 2],
    [4, 3, 0, 3],
    [4, 3, 0, 4],
    [4, 3, 1, 2],
    [4, 3, 1, 3],
    [4, 3, 1, 4],
    [4, 3, 2, 3],
    [4, 3, 2, 4],
    [4, 3, 3, 4],
    [4, 4, 0, -1],
    [4, 4, 1, -1],
    [4, 4, 2, -1],
    [4, 4, 3, -1],
    [4, 4, 4, -1],
    [4, 4, 0, 1],
    [4, 4, 0, 2],
    [4, 4, 0, 3],
    [4, 4, 0, 4],
    [4, 4, 1, 2],
    [4, 4, 1, 3],
    [4, 4, 1, 4],
    [4, 4, 2, 3],
    [4, 4, 2, 4],
    [4, 4, 3, 4],
]

let mincost = 0;
for (const shoppinglist of itempermutations)
{
    player.hp = 100;
    player.atk = 0;
    player.def = 0;
    let price = 0;
    let weapon = store.weapons[shoppinglist[0]];
    player.atk += weapon.atk;
    price += weapon.cost;
    let armor = null;
    if (shoppinglist[1] !== -1)
    {
        armor = store.armor[shoppinglist[1]];
        player.atk += armor.atk;
        player.def += armor.def;
        price += armor.cost;
    }
    let ring1 = null;
    if (shoppinglist[2] !== -1)
    {
        ring1 = store.rings[shoppinglist[2]];
        player.atk += ring1.atk;
        player.def += ring1.def;
        price += ring1.cost;
    }
    let ring2 = null;
    if (shoppinglist[3] !== -1)
    {
        ring2 = store.rings[shoppinglist[3]];
        player.atk += ring2.atk;
        player.def += ring2.def;
        price += ring2.cost;
    }

    console.log(price);
    if (!doesPlayerWin())
    {
        mincost = Math.max(mincost, price);
    }
}

console.log(mincost);