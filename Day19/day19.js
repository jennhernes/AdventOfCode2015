const path = require('path');
const fs = require('fs');

let [rules, endresult] = fs.readFileSync(path.join(__dirname, 'input.txt'))
                .toString()
                .trim()
                .split('\n\n')
                .filter(x => x !== '');

rules = rules.split('\n')
     .map(x => {
         const split = x.split(' ');
         const obj = { start: split[0], end: split[2] };
         return obj;
     });

function part1() {
    let result = [];
    for (let j = 0; j < rules.length; j++)
    {
        for (let i = 0; i < endresult.length; i++)
        {
            if (j === 0)
            {
                console.log(endresult.slice(0, i));
                console.log(endresult.slice(i));
                console.log(endresult.slice(i).replace(rules[j].start, rules[j].end));
            }
            result.push(endresult.slice(0,i) + endresult.slice(i).replace(rules[j].start, rules[j].end));
        }
    }

    console.log(rules);
    console.log(endresult);
    console.log(result);

    const set = new Set(result.slice(0,-1));
    set.delete(endresult);
    console.log(set);
    console.log(set.size);
}

function part2()
{
    let results = new Map();
    results.set(0, ['e']);

    let layer = 0;
    let created = false;
    while (!created)
    {
        let molecules = results.get(layer) as Array();
        console.log("Molecules: " + molecules);
        if (layer === 1) break;
        results.set(layer+1, new Array());
        for (const molecule of molecules)
        {
            for (const rule of rules)
            {
                let i = molecule.indexOf(rule.start);
                while (i > -1)
                {
                    let substring = molecule.slice(i);
                    let m = molecule.slice(0,i) + substring.replace(rule.start,rule.end);
                    if (m === endresult)
                    {
                        console.log(layer+1);
                        created = true;
                    }
                    results.set(layer+1, results.get(layer+1).push(m));
                    i = m.indexOf(rule.start);
                }
            }
        }
        layer++;
    }
}

part2();