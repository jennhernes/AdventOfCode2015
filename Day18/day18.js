const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, 'input.txt'))
                .toString()
                .trim()
                .split('\n')
                .map(x => Array.from(x));

let steps = 100;
let next = input;

// console.log(next);

for (let s = 0; s < steps; s++)
{
    let previous = new Array(input.length);
    for (let i = 0; i < previous.length; i++)
    {
        previous[i] = new Array(input[i].length);
        for (let j = 0; j < previous[i].length; j++)
        {
            previous[i][j] = next[i][j];
        }
    }

    for (let i = 0; i < previous.length; i++)
    {
        for (let j = 0; j < previous[i].length; j++)
        {
            if ((i === 0 && (j === 0 || j === previous[i].length-1)) ||
                (i === previous.length-1 && (j === 0 || j === previous[i].length-1)))
            {
                next[i][j] = '#';
                continue;
            }

            let neighbours = 0;

            if (i !== 0 && j !== 0 && previous[i-1][j-1] === '#')
            {
                neighbours++;
            }
            if (i !== 0 && previous[i-1][j] === '#')
            {
                neighbours++;
            }
            if (i !== 0 && j !== previous[i].length-1 && previous[i-1][j+1] === '#')
            {
                neighbours++;
            }

            if (j !== 0 && previous[i][j-1] === '#')
            {
                neighbours++;
            }
            if (j !== previous[i].length-1 && previous[i][j+1] === '#')
            {
                neighbours++;
            }

            if (i !== previous.length-1 && j !== 0 && previous[i+1][j-1] === '#')
            {
                neighbours++;
            }
            if (i !== previous.length-1 && previous[i+1][j] === '#')
            {
                neighbours++;
            }
            if (i !== previous.length-1 && j !== previous[i].length-1 && previous[i+1][j+1] === '#')
            {
                neighbours++;
            }

            if ((previous[i][j] === '#' && (neighbours === 2 || neighbours === 3)) ||
                (previous[i][j] === '.' && neighbours === 3))
            {
                next[i][j] = '#';
            }
            else {
                next[i][j] = '.';
            }
        }
    }
    // console.log(s);
    // console.log(next);
}

let lights = 0;
for (let i = 0; i < next.length; i++)
{
    for (let j = 0; j < next[i].length; j++)
    {
        if (next[i][j] === '#')
        {
            lights++;
        }
    }
}

console.log(lights);