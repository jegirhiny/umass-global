const fs = require('fs');
const axios = require('axios');

function cat(path, outputFilename) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(err.message);
            process.exit(1);
        } else {
            writeToFile(data, outputFilename);
        }
    });
}

async function webCat(url, outputFilename) {
    try {
        const response = await axios.get(url);
        writeToFile(response.data, outputFilename);
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

function writeToFile(data, outputFilename) {
    if (outputFilename) {
        fs.writeFile(outputFilename, data, 'utf8', (err) => {
            if (err) {
                console.error(err.message);
                process.exit(1);
            }
        });
    } else {
        console.log(data);
    }
}

const arg1 = process.argv[2];

if (arg1 === '--out') {
    const outputFilename = process.argv[3];
    const arg2 = process.argv[4];
    
    if (arg2.includes('http')) {
        webCat(arg2, outputFilename);
    } else {
        cat(arg2, outputFilename);
    }
} else {
    if (arg1.includes('http')) {
        webCat(arg1);
    } else {
        cat(arg1);
    }
}