'use strict';

// const fs = require('fs');
//
// process.stdin.resume();
// process.stdin.setEncoding('utf-8');
//
// let inputString = '';
// let currentLine = 0;
//
// process.stdin.on('data', inputStdin => {
//     inputString += inputStdin;
// });
//
// process.stdin.on('end', function() {
//     inputString = inputString.replace(/\s*$/, '')
//         .split('\n')
//         .map(str => str.replace(/\s*$/, ''));
//
//     main();
// });

function readLine() {
    return inputString[currentLine++];
}

// Complete the formingMagicSquare function below.
function formingMagicSquare(s) {

    // Convert to 1 dimensional array
    return wrapper(s.flat());
}

function isMagicSquare(arr) {

    let a = [];

    // Convert to 2 dimensional array
    for (let i = 0; i < 3; i++){
        a[i] = [];
        for (let j = 0; j < 3; j++){
            a[i][j] = arr[3 * i + j];
        }
    }

    // Get the first row total
    let s = 0;
    for (let j = 0; j < 3; j++) {
        s += a[0][j];
    }

    // Checking if each row sum is same
    for (let i = 1; i <= 2; i++) {
        let tmp = 0;
        for (let j = 0; j < 3; j++) {
            tmp += a[i][j];
        }
        if (tmp != s) {
            return false;
        }
    }

    // Checking if each column sum is same
    for (let j = 0; j < 3; j++) {
        let tmp = 0;
        for (let i = 0; i < 3; i++) {
            tmp += a[i][j];
        }
        if (tmp != s) {
            return false;
        }
    }

    // Checking if diagonal 1 sum is same
    let tmp = 0;
    for (let i = 0; i < 3; i++) {
        tmp += a[i][i];
    }
    if (tmp != s) {
        return false;
    }

    // Checking if diagonal 2 sum is same
    tmp = 0;
    for (let i = 0; i < 3; i++) {
        tmp += a[2 - i][i];
    }
    if (tmp != s) {
        return false;
    }

    return true;
}

// Generating all magic square
function findMagicSquares()
{
    let v = Array(9);
    let arr = [];

    // Initialing the array
    for (let i = 0; i < 9; i++){
        v[i] = i + 1;
    }

    // Producing all permutation of array to check if it denote the magic square.
    do {
        if (isMagicSquare(v)) {
            arr.push(v.slice(0));
        }
    }
    while (nextPermutation(v));

    return arr;
}

// Return sum of difference between each element of two vector
function diff(a, b)
{
    let res = 0;
    for (let i = 0; i < 9; i++){
        res += Math.abs(a[i] - b[i]);
    }

    return res;
}

// Wrapper function
function wrapper(v)
{
    let res = Number.MAX_SAFE_INTEGER;

    // Generating all magic square
    let magicSquares = findMagicSquares();

    for (let i = 0; i < magicSquares.length; i++) {

        // Finding the difference with each magic square and assign the minimum value.
        res = Math.min(res, diff(v, magicSquares[i]));
    }
    return res;
}

function nextPermutation(array) {
    // Find non-increasing suffix
    var i = array.length - 1;
    while (i > 0 && array[i - 1] >= array[i])
        i--;
    if (i <= 0)
        return false;

    // Find successor to pivot
    var j = array.length - 1;
    while (array[j] <= array[i - 1])
        j--;
    var temp = array[i - 1];
    array[i - 1] = array[j];
    array[j] = temp;

    // Reverse suffix
    j = array.length - 1;
    while (i < j) {
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        i++;
        j--;
    }
    return true;
}


// Comment out if array.flat() method is already implemented in later Node versions
Object.defineProperty(Array.prototype, 'flat', {
    value: function (depth = 1) {
        return this.reduce(function (flat, toFlatten) {
            return flat.concat((Array.isArray(toFlatten) && (depth > 1)) ? toFlatten.flat(depth - 1) : toFlatten);
        }, []);
    }
});

function main() {
    // const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    // let s = Array(3);
    //
    // for (let i = 0; i < 3; i++) {
    //     s[i] = readLine().split(' ').map(sTemp => parseInt(sTemp, 10));
    // }

    let s = [
        [4, 9, 2],
        [3, 5, 7],
        [8, 1, 5]
    ];

    const result = formingMagicSquare(s);

    console.log(result + '\n')

    // ws.write(result + '\n');
    //
    // ws.end();
}

main();