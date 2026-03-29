import assert from 'node:assert/strict';
import fs from 'fs/promises';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// data structure for the problem - array of years sorted, then array of values sorted based on months array so that it will be in ascending order
// using this for brute force and binary search.

async function extractNumber (filepath) {
    const fileContent = await fs.readFile(filepath, { encoding: 'utf-8' });
    const matchArray = fileContent.match(/\[\[Number of people:\s*(\d+)\]\]/);
    return Number(matchArray[1]);
}

async function init () {
    const dataFolder = (await fs.readdir('data', { withFileTypes: true }));
    const yearsArray = dataFolder.filter(dir => dir.isDirectory()).map(curr => Number(curr.name)).sort();
    const dataMap = await yearsArray.reduce(async (accPromise, curr) => {
        const acc = await accPromise;
        const files = (await fs.readdir('data/'+ curr, { withFileTypes: true })).map(curr => curr.name);
        acc[curr] = {};
        const extractPromise = files.map(async (file) => {
            const numberOfPeople = await extractNumber('data/' + curr + '/' + file);
            acc[curr][file] = numberOfPeople;
        });
        await Promise.all(extractPromise);
        return acc;
    }, Promise.resolve({}));

    const valueArrayForBinarySearch = yearsArray.map(year => {
        let i = 11;
        while(!dataMap[year][months[i] + '.txt'] && i >= 0) {
            i--;
        }
        return dataMap[year][months[i] + '.txt'];
    });

    
    function bruteForceSearch (number) {
        return yearsArray.find(year => {
            return months.find(month => dataMap[year][month + '.txt'] === number);
        });
    }

    function binarySearchForMonth (year, number) {
        let low = 0;
        let high = 11;
        while(low <= high) {
            const mid = Math.floor((high + low) / 2);
            const value = dataMap[year][months[mid] + '.txt'];
            if (value > number || value == null) {
                high = mid - 1;
            } else if (value < number) {
                low = mid + 1;
            } else {
                return year
            }
        }
    }

    function binarySearchForYear(number) {
        let low = 0;
        let high = valueArrayForBinarySearch.length - 1;
        while(low <= high) {
            const mid = Math.floor((high + low) / 2);
            const isCurrentYear = number < valueArrayForBinarySearch[mid] && (mid - 1 < 0 || number > valueArrayForBinarySearch[mid - 1]);
            if (isCurrentYear) return binarySearchForMonth(yearsArray[mid], number);
            if (number < valueArrayForBinarySearch[mid]) {
                high = mid - 1;
            } else if (number > valueArrayForBinarySearch[mid]) {
                low = mid + 1;
            } else {
                return yearsArray[mid];
            }
        }
    }

    const lookupCases = [
        { number: 329, expectedYear: 1000, description: 'finds the first value in the dataset' },
        { number: 1017, expectedYear: 1000, description: 'finds an early in-year value' },
        { number: 79579, expectedYear: 1013, description: 'finds the documented sample value' },
        { number: 50106990, expectedYear: 9331, description: 'finds the last value in the final full year' },
        { number: 50113385, expectedYear: 9333, description: 'finds the first value in the partial final year' },
        { number: 50114113, expectedYear: 9333, description: 'finds the largest available value' },
        { number: 121, expectedYear: undefined, description: 'returns no match for a value far below the dataset' },
        { number: 328, expectedYear: undefined, description: 'returns no match just below the smallest value' },
        { number: 330, expectedYear: undefined, description: 'returns no match between the first two values' },
        { number: 50106991, expectedYear: undefined, description: 'returns no match in the gap after the final full year' },
        { number: 50114111, expectedYear: undefined, description: 'returns no match for a missing value near the upper bound' },
        { number: 50114114, expectedYear: undefined, description: 'returns no match above the largest available value' }
    ];

    for (const { number, expectedYear, description } of lookupCases) {
        assert.strictEqual(
            bruteForceSearch(number),
            expectedYear,
            `bruteForceSearch ${description}: expected ${expectedYear} for ${number}`
        );
        assert.strictEqual(
            binarySearchForYear(number),
            expectedYear,
            `binarySearchForYear ${description}: expected ${expectedYear} for ${number}`
        );
    }
}

await init();
