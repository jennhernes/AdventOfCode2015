const assert = require('assert')
const path = require('path')
const fs = require('fs')

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

let dict = new Map();

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
                .toString()
                .trim()
                .split('\n')
                .map(x => x = x.replace(' = ', ' '))
                .map(x => x = x.replace(' to ', ' '));

for (var i = 0; i < input.length; i++)
{
    const line = input[i].split(' ');
    if (!dict.has(line[0])) {
        dict.set(line[0], []);
    }
    values = dict.get(line[0]);
    values.push({ city: line[1], distance: line[2] });
    dict.set(line[0], values);
    
    if (!dict.has(line[1])) {
        dict.set(line[1], []);
    }
    values = dict.get(line[1]);
    values.push({ city: line[0], distance: line[2] });
    dict.set(line[1], values);
}

const numCities = Array.from(dict.keys()).length
permutations = permutator(Array.from(dict.keys()));

let route_distance = new Array(permutations.length).fill(0);

for (let i = 0; i < permutations.length; i++) {
    for (let j = 0; j < numCities - 1; j++) {
        city = dict.get(permutations[i][j]).filter(x => x.city === permutations[i][j+1])
        if (city.length === 0)
        {
            city = dict.get(permutations[i][j+1]).filter(x => x.city === permutations[i][j])
        }
        route_distance[i] += parseInt(city[0].distance);
    }
}

route_distance.sort();

// console.log(permutations)

// Part 1
console.log(route_distance[0])

// Part 2
console.log(route_distance[route_distance.length-1])