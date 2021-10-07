const path = require('path');
const fs = require('fs');

const time = 2503

const input = fs.readFileSync(path.join(__dirname, 'input.txt'))
                .toString()
                .trim()
                .replace(/can fly /g, '')
                .replace(/for /g, '')
                .replace(/\, but then must rest/g, '')
                .replace(/\n/g, '')
                .split('.')
                .filter(x => x !== '')
                .map(x => {
                    const line = x.split(' ')
                    let obj = { name: line[0], 
                                speed: parseInt(line[1]), 
                                flytime: parseInt(line[3]), 
                                restime: parseInt(line[5]) 
                              };
                    return obj;
                });

let points = new Array(input.length).fill(0);
for (let i = 1; i <= time; i++)
{
    let distances = new Array(input.length);
    for (let j = 0; j < input.length; j++)
    {
        const reindeer = input[j];
        const framelength = reindeer.flytime + reindeer.restime;
        const framedistance = reindeer.speed * reindeer.flytime;

        distances[j] = Math.floor(i / framelength) * framedistance;
        const leftover = Math.ceil(i % framelength);
        distances[j] += Math.min(leftover, reindeer.flytime) * reindeer.speed;
    }

    points[distances.indexOf(Math.max(...distances))] += 1;
}

console.log(Math.max(...points));

console.log(input);