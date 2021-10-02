// const input = 'vzbxkghb';
const input = 'vzbxxyzz';

let newpassword = input;
while (true)
{
    for (let i = 0; i < newpassword.length; i++)
    {
        lastchar = newpassword[newpassword.length-1-i];
        if (lastchar === 'z')
        {
            if (i === 0)
            {
                newpassword = newpassword.substring(0, newpassword.length-1) + 'a';
            }
            else 
            {
                newpassword = newpassword.substring(0, newpassword.length-1-i) + 'a' + newpassword.substring(newpassword.length-i, newpassword.length);
            }
            continue;
        }
        newchar = String.fromCharCode(lastchar.charCodeAt(0) + 1);
        if (i === 0)
        {
            newpassword = newpassword.substring(0, newpassword.length-1) + newchar;
        }
        else 
        {
            newpassword = newpassword.substring(0, newpassword.length-1-i) + newchar + newpassword.substring(newpassword.length-i, newpassword.length);
        }
        break;
    }
    
    if (newpassword.includes('i') || newpassword.includes('l') || newpassword.includes('o'))
    {
        continue;
    }
    straight = false;
    for (let i = 2; i < newpassword.length; i++)
    {
        if (newpassword.charCodeAt(i-2) + 1 === newpassword.charCodeAt(i-1)
            && newpassword.charCodeAt(i-1) + 1 === newpassword.charCodeAt(i))
        {
            straight = true;
            break;
        }
    }
    if (!straight) {
        continue;
    }
    pairs = 0
    for (let i = 1; i < newpassword.length; i++)
    {
        if (newpassword[i-1] == newpassword[i]) {
            pairs++;
            i++;
        }
    }
    if (pairs < 2)
    {
        continue;
    }

    break;
}

console.log(newpassword);