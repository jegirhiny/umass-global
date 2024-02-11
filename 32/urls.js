const fs = require('fs');
const path = require('path');
const axios = require('axios');

if (process.argv.length !== 3) {
  console.log('Usage: node urls.js FILENAME');
  process.exit(1);
}

const filename = process.argv[2];

fs.readFile(filename, 'utf8', async (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        process.exit(1);
    }
    
    const urls = data.trim().split('\n');
  
    urls.forEach(async url => {
        try {
            const response = await axios.get(url);
            const hostname = new URL(url).hostname;
            const filePath = path.join(__dirname, `${hostname}.html`);
            fs.writeFileSync(filePath, response.data);
            console.log(`HTML content from ${url} saved to ${hostname}.html`);
        } catch (error) {
            console.error(`Error fetching or saving ${url}:`, error.message);
        }
    })
});