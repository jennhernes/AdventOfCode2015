const path = require('path');
const fs = require('fs');

let [rules, molecule] = fs.readFileSync(path.join(__dirname, 'input.txt'))
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
        for (let i = 0; i < molecule.length; i++)
        {
            if (j === 0)
            {
                console.log(molecule.slice(0, i));
                console.log(molecule.slice(i));
                console.log(molecule.slice(i).replace(rules[j].start, rules[j].end));
            }
            result.push(molecule.slice(0,i) + molecule.slice(i).replace(rules[j].start, rules[j].end));
        }
    }

    console.log(rules);
    console.log(molecule);
    console.log(result);

    const set = new Set(result.slice(0,-1));
    set.delete(molecule);
    console.log(set);
    console.log(set.size);
}

function part2()
{
    let results = new Map();
    results.set(0, ['e']);

    let layer = 0;
    while (true)
    {
        let molecules = results.get(layer);
        for (const molecule of molecules)
        {
            for (const rule in rules)
            {
                let i = substring.indexOf(rule.start);
                while (i > -1)
                {
                    let substring = molecule.slice(i);
                    let m = molecule.slice(0,i) + molecule.slice(i).replace(rule.start,rule.end);
                    rules.set(layer+1, rules.get(layer+1).append(m));
                    i = molecule.slice()
                }
            }
        }
    }
}