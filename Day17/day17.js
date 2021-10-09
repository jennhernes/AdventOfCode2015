const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, "input.txt"))
                .toString()
                .trim()
                .split('\n')
                .filter(x => x !== '')
                .map(x => parseInt(x));
console.log(input);

let dict = new Map();
function countcombinations(containers, litres, using) 
{
    // console.log(litres + ' ' + containers);
    if (litres === 0)
    {
        if (!dict.has(using.length))
        {
            dict.set(using.length, 1)
        }
        else {
            dict.set(using.length, dict.get(using.length) + 1)
        }
        return 1;
    }
    else if (litres < 0 || containers.length === 0 || (containers.length === 1 && containers[0] !== litres))
    {
        return 0;
    }
    else {
        let result = 0;
        for (let i = 0; i < containers.length; i++)
        {
            const container = containers[i];
            result += countcombinations(containers.slice(i+1), litres-container, using.concat([container]));
        }

        return result;
    }
}
let arr = []
console.log(countcombinations(input, 150, arr));
console.log(input.length);
console.log(dict);