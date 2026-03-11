
function divideByTwo (number) {
    const remainder = number % 2;
    const quotient = Math.floor(number / 2);
    return {
        quotient,
        remainder
    }
}

function invertBinary(binary) {
    let invertedBinary = '';
    for (let i = binary.length; i > 0;i--) {
        invertedBinary = (binary[i - 1] === '1' ? '0' : '1') + invertedBinary;
    }
    while (invertedBinary.length < 16) {
        invertedBinary = '1' + invertedBinary;
    }

    return invertedBinary;
}

function addBinaryOne (binary) {
    let carry = true;
    let bit = 1;
    let finalBinary = binary.split('')
    while (bit < binary.length && carry) {
        const currentBit = finalBinary[finalBinary.length - bit];
        // console.log(currentBit, finalBinary)
        carry = currentBit === '1';
        finalBinary[binary.length - bit] = carry ? '0' : '1';
        bit++;
    }

    return finalBinary.join('');
}

// considering 16 bit binary
function getBinary (number) {
    let binary = '';
    let currNumber = Math.abs(number);
    while(true) {
        const {quotient, remainder} = divideByTwo(currNumber);
        binary = remainder + binary;
        if (quotient === 0) {
            break;
        }
        currNumber = quotient;
    }

    if (number < 0) {
        // console.log(binary);
        binary = invertBinary(binary);
        // console.log(binary);
        binary = addBinaryOne(binary);
        // console.log(binary);
    }

    return binary;
}

console.assert(getBinary(2) === '10', 'binary conversion of 2 is incorrect');
console.assert(getBinary(1) === '1', 'binary conversion of 1 is incorrect');
console.assert(getBinary(25) === '11001', 'binary conversion of 25 is incorrect');
console.assert(getBinary(134) === '10000110', 'binary conversion of 134 is incorrect');
console.assert(getBinary(168) === '10101000', 'binary conversion of 168 is incorrect');
console.assert(getBinary(-1) === '1111111111111111', 'binary conversion of -1 is incorrect');
console.assert(getBinary(-2) === '1111111111111110', 'binary conversion of -2 is incorrect');
console.assert(getBinary(-100) === '1111111110011100', 'binary conversion of -2 is incorrect');