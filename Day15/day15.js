const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, 'input.txt'))
                .toString()
                .trim()
                .replace(/\:/g, '')
                .replace(/\,/g, '')
                .split('\n')
                .filter(x => x !== '')
                .map(x => {
                    const tokens = x.split(' ');
                    const obj = { ingredient: tokens[0],
                                  capacity: parseInt(tokens[2]),
                                  durability: parseInt(tokens[4]),
                                  flavour: parseInt(tokens[6]),
                                  texture: parseInt(tokens[8]),
                                  calories: parseInt(tokens[10]) };
                    return obj;
                });

maxscore = 0
for (let i = 0; i <= 100; i++)
{
    for (let j = 0; j <= 100 - i; j++)
    {
        for (let k = 0; k <= 100 - i - j; k++)
        {
            for (let l = 0; l <= 100 - i - j - k; l++)
            {
                if (i * input[0].calories + j * input[1].calories + k * input[2].calories + l * input[3].calories === 500)
                {
                    capacity = i * input[0].capacity + j * input[1].capacity + k * input[2].capacity + l * input[3].capacity;
                    durability = i * input[0].durability + j * input[1].durability + k * input[2].durability + l * input[3].durability;
                    flavour = i * input[0].flavour + j * input[1].flavour + k * input[2].flavour + l * input[3].flavour;
                    texture = i * input[0].texture + j * input[1].texture + k * input[2].texture + l * input[3].texture;
                    capacity = Math.max(0, capacity);
                    durability = Math.max(0, durability);
                    flavour = Math.max(0, flavour);
                    texture = Math.max(0, texture);
                    maxscore = Math.max(maxscore, capacity * durability * flavour * texture);
                }
            }
        }
    }
}

console.log(input);
console.log(maxscore);