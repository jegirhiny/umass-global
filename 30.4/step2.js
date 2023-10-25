const fs = require('fs');
const axios = require('axios');

function cat(path) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error(err.message);
      process.exit(1);
    } else {
      console.log(data);
    }
  });
}

async function webCat(url) {
    try {
        const response = await axios.get(url);
        console.log(response.data);
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

const arg = process.argv[2];

if(arg.includes('http')) {
    webCat(arg);
} else {
    cat(arg);
}