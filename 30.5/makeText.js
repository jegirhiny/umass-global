const fs = require("fs").promises;
const markov = require("./markov");
const axios = require("axios");

async function generateText(text) {
  try {
    const mm = new markov.MarkovMachine(text);
    console.log(mm.makeText());
  } catch (err) {
    console.error(`Error generating text: ${err}`);
  }
}

async function makeText(path) {
  try {
    const data = await fs.readFile(path, "utf8");
    await generateText(data);
  } catch (err) {
    console.error(`Error reading file: ${err}`);
  }
}

async function makeURLText(url) {
  try {
    const response = await axios.get(url);
    await generateText(response.data);
  } catch (err) {
    console.error(`Error reading URL: ${err}`);
  }
}

const [method, path] = process.argv.slice(2);

if (method === "file") {
  makeText(path);
} else if (method === "url") {
  makeURLText(path);
} else {
  console.error(`Unknown method: ${method}`);
}