const path = require('path');
const fs = require('fs');

function getAllSubsets(array, maxsize) {
    const subsets = [[]];
    
    for (const el of array) {
        const last = subsets.length-1;
        for (let i = 0; i <= last; i++) {
            if (subsets[i].length < maxsize)
            {
                subsets.push( [...subsets[i], el] );
            }
        }
    }
    
    return subsets;
}

const numgroups = 4;
const input = fs.readFileSync(path.join(__dirname, 'input.txt'))
                .toString()
                .trim()
                .split('\n')
                .map(x => parseInt(x));

const weight = input.reduce((x,y) => x+y) / numgroups;
const maxsize = Math.floor(input.length / numgroups);
console.log(weight + ' ' + maxsize);
const subsets = getAllSubsets(input, maxsize).filter(x => x.length > 0)
                                             .filter(x => x.reduce((a,b) => a+b) === weight);
console.log(subsets);

let results = []

for (const set of subsets)
{
    if (!results[set.length])
    {
        results[set.length] = [];
    }

    results[set.length].push(set.reduce((x,y) => x*y));
}

for (let i = 0; i <= maxsize; i++)
{
    if (results[i] && results[i].length > 0)
    {
        console.log(Math.min(...results[i]));
        break;
    }
}