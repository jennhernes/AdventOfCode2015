const path = require('path');
const fs = require('fs');


function permutator(inputArr) {
    var results = [];
  
    function permute(arr, memo) {
        var cur, memo = memo || [];

        for (var i = 0; i < arr.length; i++) {
            cur = arr.splice(i, 1);
            if (arr.length === 0) {
                results.push(memo.concat(cur));
            }
            permute(arr.slice(), memo.concat(cur));
            arr.splice(i, 0 , cur[0]);
        }

        return results;
    }
  
    return permute(inputArr);
}

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8')
                .toString()
                .trim()
                .replace(/ would gain /g, ' ')
                .replace(/ would lose /g, ' -')
                .replace(/ happiness units by sitting next to /g, ' ')
                .replace(/\n/g, '')
                .split('.')
                .map(x => x.split(' '))
                .map(x => {
                    const obj = {}
                    obj['id'] = x[0];
                    obj['neighbour'] = x[2];
                    obj['gain'] = x[1];
                    return obj;
                })
                .filter(x => x.id !== '');

let map = new Map();
for (const obj of input)
{
    if (!map.has(obj.id))
    {
        map.set(obj.id, [[obj.neighbour, obj.gain], ['me', 0]]);
    }
    else {
        values = map.get(obj.id);
        values.push([obj.neighbour, obj.gain]);
        map.set(obj.id, values);
    }
}

let me = []
for (const guest of map.keys())
{
    me.push({id: 'me', neighbour: guest, gain: 0});
}

map.set(me[0].id, []);
for (const obj of me)
{
    values = map.get(obj.id);
    values.push([obj.neighbour, obj.gain]);
    map.set(obj.id, values);
}


const seating = permutator(Array.from(map.keys())).filter(x => x[0] === 'me');
let score = new Array(seating.length).fill(0);
const numpeople = seating[0].length;

for (let i = 0; i < seating.length; i++)
{
    arrangement = seating[i];

    for (let j = 0; j < numpeople; j++)
    {
        let person = map.get(arrangement[j]);
        
        score[i] += parseInt(person.find(x => x[0] === arrangement[(j + 1) % numpeople])[1], 10)
        if (isNaN(score[i])) {
            console.log(arrangement[j] + ' ' + arrangement[(j + 1) % numpeople] + '\n' + person)
        }
        score[i] += parseInt(person.find(x => x[0] === arrangement[(j + numpeople - 1) % numpeople])[1], 10)
        if (isNaN(score[i])) {
            console.log(arrangement[j] + ' ' + arrangement[(j + numpeople - 1) % numpeople] + '\n' + person)
        }
    }
}

// console.log(map);
console.log(score);
console.log(Math.max(...score))