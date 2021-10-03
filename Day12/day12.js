const path = require('path');
const fs = require('fs');

function part1() {
    let result = 0;
    const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8')
                    .toString()
                    .trim()
                    .split(/\[|\]|\{|\}|\:|\,/)
                    .filter(x => x)
                    .filter(x => !x.includes('"'));
    for (const num of input)
    {
        result += parseInt(num);
    }

    console.log(input);
    console.log(result);
}

function part2() {
    let result = 0;
    const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8')
                    .toString()
                    .trim();
    
    const obj = JSON.parse(input);
    console.log(count(obj));
}

function count(obj) {
    let result = 0;
    if (typeof(obj) === 'object' && !Array.isArray(obj))
    {
        let containsred = false;
        for (const [key,value] of Object.entries(obj)) 
        {
            if (value === 'red')
            {
                containsred = true;
                break;
            }
        }
        if (containsred)
        {
            return 0;
        }
    }

    for (const [key,value] of Object.entries(obj))
    {
        if (typeof(value) === 'object')
        {
            // object is either object or array
            if (Array.isArray(value))
            {
                for (const element of value)
                {
                    const type = typeof(element);
                    if (type === 'number')
                    {
                        result += element;
                    }
                    else if (type === 'object')
                    {
                        result += count(element);
                    }
                }
            } 
            else 
            {
                result += count(value);
            }
        }
        else if (typeof(value) === 'number')
        {
            result += value;
        }
    }
    
    return result;
}

// part1();
part2();