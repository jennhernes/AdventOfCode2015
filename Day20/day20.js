const path = require('path');
const fs = require('fs');

const input = 29000000;

function calculatepresents(house)
{
    // console.log(house);
    let elves = [1];
    for (let i = 2; i <= Math.sqrt(house); i++)
    {
        if (house % i === 0)
        {
            elves.push(i);

            if (i * i !== house)
            {
                elves.push(house / i);
            }
        }
    }

    if (house > 1)
    {
        elves.push(house);
    }

    const result = 10 * elves.reduce((x,y) => x+y);
    // console.log(elves + ' => ' + result);
    return result;
}

function part2()
{
    let houses = new Array(2000000).fill(0);
    for (let elf = 1; elf < input / 10; elf++)
    {
        // console.log(elf)
        for (let i = 1; i <= 50; i++)
        {
            const house = elf * i;
            if (house < 2000000) houses[house] += elf * 11;
        }
    }

    for (let i = 0; i < input; i++)
    {
        if (houses[i] >= input)
        {
            console.log(i);
            break;
        }
    }
}

// let i = 1;
// while (calculatepresents(i) < input)
// {
//     i++;
// }

// console.log(i);

part2();