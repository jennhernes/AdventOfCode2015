const input = '3113322113';
// const input = '11'

let prev = input;

for (let i = 0; i < 50; i++)
{
    next = '';
    count = 1;
    for (let j = 1; j < prev.length; j++)
    {
        if (prev[j-1] != prev[j])
        {
            next += count;
            next += prev[j-1];
            count = 1;
        }
        else 
        {
            count++;
        }
    }
        
    next += count;
    next += prev[prev.length-1];
    count = 1;

    prev = next;
}

console.log(next.length);