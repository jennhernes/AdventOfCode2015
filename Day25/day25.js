const code_row = 2978;
const code_col = 3083;

// const code_row = 4;
// const code_col = 3;

let row = 1;
let col = 1;
let code = BigInt(20151125);

while (row !== code_row || col !== code_col)
{
    if (row === 1)
    {
        row = col + 1;
        col = 1;
    }
    else {
        row--;
        col++;
    }

    code = (code * BigInt(252533)) % BigInt(33554393);
    // console.log(code);
}

console.log(code);