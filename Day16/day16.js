const path = require('path');
const fs = require('fs');

const facts = { children: 3,
                cats: 7,
                samoyeds: 2,
                pomeranians: 3,
                akitas: 0,
                vizslas: 0,
                goldfish: 5,
                trees: 3,
                cars: 2,
                perfumes: 1 
              };

const input = fs.readFileSync(path.join(__dirname, "input.txt"))
                .toString()
                .trim()
                .split('\n')
                .filter(x => x !== '')
                .map(x => x.split(/\,?\:? /))
                .map(x => {
                    const obj = { id: x[1] };
                    index = x.findIndex(e => e === 'children');
                    if (index !== -1)
                    {
                        obj['children'] = parseInt(x[index+1]);
                    }
                    index = x.findIndex(e => e === 'cats');
                    if (index !== -1)
                    {
                        obj['cats'] = parseInt(x[index+1]);
                    }
                    index = x.findIndex(e => e === 'samoyeds');
                    if (index !== -1)
                    {
                        obj['samoyeds'] = parseInt(x[index+1]);
                    }
                    index = x.findIndex(e => e === 'pomeranians');
                    if (index !== -1)
                    {
                        obj['pomeranians'] = parseInt(x[index+1]);
                    }
                    index = x.findIndex(e => e === 'akitas');
                    if (index !== -1)
                    {
                        obj['akitas'] = parseInt(x[index+1]);
                    }
                    index = x.findIndex(e => e === 'vizslas');
                    if (index !== -1)
                    {
                        obj['vizslas'] = parseInt(x[index+1]);
                    }
                    index = x.findIndex(e => e === 'goldfish');
                    if (index !== -1)
                    {
                        obj['goldfish'] = parseInt(x[index+1]);
                    }
                    index = x.findIndex(e => e === 'trees');
                    if (index !== -1)
                    {
                        obj['trees'] = parseInt(x[index+1]);
                    }
                    index = x.findIndex(e => e === 'cars');
                    if (index !== -1)
                    {
                        obj['cars'] = parseInt(x[index+1]);
                    }
                    index = x.findIndex(e => e === 'perfumes');
                    if (index !== -1)
                    {
                        obj['perfumes'] = parseInt(x[index+1]);
                    }

                    return obj;
                });

for (const aunt of input)
{
    if ((!('children' in aunt) || aunt.children === facts.children)
        && (!('cats' in aunt) || aunt.cats > facts.cats)
        && (!('samoyeds' in aunt) || aunt.samoyeds === facts.samoyeds)
        && (!('pomeranians' in aunt) || aunt.pomeranians < facts.pomeranians)
        && (!('akitas' in aunt) || aunt.akitas === facts.akitas)
        && (!('vizslas' in aunt) || aunt.vizslas === facts.vizslas)
        && (!('goldfish' in aunt) || aunt.goldfish < facts.goldfish)
        && (!('trees' in aunt) || aunt.trees > facts.trees)
        && (!('cars' in aunt) || aunt.cars === facts.cars)
        && (!('perfumes' in aunt) || aunt.perfumes === facts.perfumes))
    {
        console.log(aunt.id);
        break;
    }
}

// console.log(input);