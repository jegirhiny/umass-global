const express = require('express');

const app = express();

app.use(express.json());

app.get('/mean', (req, res) => {
    if(req.query.nums === undefined) {
        res.status(400).send('Invalid Input - Ensure that the query string contains only numerical values.')
    }

    const nums = req.query.nums.split(',').map(value => parseInt(value));

    if(hasLetters(nums)) {
        res.status(404).send('Invalid Input - Please use only numerical values; letters are not allowed.')
    }

    const sum = nums.reduce((prevValue, curValue) => prevValue + curValue, 0)
    res.json({operation: 'mean', value: sum / nums.length});
})

app.get('/median', (req, res) => {
    if(req.query.nums === undefined) {
        res.status(400).send('Invalid Input - Ensure that the query string contains only numerical values.')
    }

    const nums = req.query.nums.split(',').map(value => parseInt(value));

    if(hasLetters(nums)) {
        res.status(404).send('Invalid Input - Please use only numerical values; letters are not allowed.')
    }

    nums.sort((a, b) => a - b);

    if (nums.length % 2 !== 0) {
        res.json({ operation: 'median', value: nums[Math.floor(nums.length / 2)] });
    } else {
        const mid1 = nums[nums.length / 2 - 1], mid2 = nums[nums.length / 2];
        res.json({ operation: 'median', value: (mid1 + mid2) / 2 });
    }
});

app.get('/mode', (req, res) => {
    if(req.query.nums === undefined) {
        res.status(400).send('Invalid Input - Ensure that the query string contains only numerical values.')
    }

    const nums = req.query.nums.split(',').map(value => parseInt(value));

    if(hasLetters(nums)) {
        res.status(400).send('Invalid Input - Please use only numerical values; letters are not allowed.')
    }

    const numMap = new Map();

    nums.forEach(number => {
        if(numMap.has(number)) {
            numMap.set(number, numMap.get(number) + 1);
        } else {
            numMap.set(number, 1);
        }
    });

    let mostFrequentValues = [];
    let maxFrequency = 0;

    numMap.forEach((frequency, value) => {
        if (frequency > maxFrequency) {
            mostFrequentValues = [value];
            maxFrequency = frequency;
        } else if (frequency === maxFrequency) {
            mostFrequentValues.push(value);
        }
    });

    res.json({ operation: 'mode', value: mostFrequentValues });
})

app.listen(3000, () => {
    console.log('App on port 3000');
})

function hasLetters(arr) {
    return arr.some(element => typeof element !== 'number' || isNaN(element));
}