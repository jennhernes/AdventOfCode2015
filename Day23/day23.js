const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, 'input.txt'))
                .toString()
                .trim()
                .replace(/,/g, '')
                .split('\n')
                .map(x => x.split(' '));

let i = 0;
let a = 1;
let b = 0;
while (i < input.length)
{
    let instruction = input[i];
    console.log(i + ': ' + instruction + ', a=' + a + ', b=' + b);
    if (instruction[0] === 'hlf')
    {
        if (instruction[1] === 'a')
        {
            a = Math.floor(a/2);
        }
        if (instruction[1] === 'b')
        {
            b = Math.floor(b/2);
        }
        i++;
    }
    else if (instruction[0] === 'tpl')
    {
        if (instruction[1] === 'a')
        {
            a = a*3;
        }
        if (instruction[1] === 'b')
        {
            b = b*3;
        }
        i++;
    }
    else if (instruction[0] === 'inc')
    {
        if (instruction[1] === 'a')
        {
            a++;
        }
        if (instruction[1] === 'b')
        {
            b++;
        }
        i++;
    }
    else if (instruction[0] === 'jmp')
    {
        i += parseInt(instruction[1]);
    }
    else if (instruction[0] === 'jie')
    {
        if ((instruction[1] === 'a' && a % 2 === 0)
            || (instruction[1] === 'b' && b % 2 === 0))
        {
            i += parseInt(instruction[2]);
        }
        else 
        {
            i++;
        }
    }
    else if (instruction[0] === 'jio')
    {
        if ((instruction[1] === 'a' && a === 1)
            || (instruction[1] === 'b' && b === 1))
        {
            i += parseInt(instruction[2]);
        }
        else 
        {
            i++;
        }
    }
}

console.log(input.length);
console.log(b);
