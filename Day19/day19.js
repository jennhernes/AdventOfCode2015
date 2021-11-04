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
    rules = rules.sort((x,y) => y.end.length - x.end.length);
    console.log(rules);
    let steps = 0;
    let created = false;
    let molecule = endresult;
    while (!created)
    {
        let r = 0;
        while (molecule.indexOf(rules[r].end) === -1)
        {
            r++;
        }
        let rule = rules[r];
        console.log(`Looking at rule ${rule.start} => ${rule.end}`);
        let i = molecule.indexOf(rule.end);
        let substring = molecule.slice(i);
        molecule = molecule.slice(0,i) + substring.replace(rule.end,rule.start);
        steps++;
        if (molecule === 'e')
        {
            console.log(steps + ": " + molecule);
            created = true;
            break;
        }
    }
}
