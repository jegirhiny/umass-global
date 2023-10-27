class MarkovMachine {
  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
    console.log(this.makeText())
  }

  makeChains() {
    let chains = {};

    for (let i = 0; i < this.words.length; i += 1) {
      let word = this.words[i];
      let nextWord = this.words[i + 1] || null;

      if (chains[word]) {
        chains[word].push(nextWord) 
      } else {
        chains[word] = [nextWord];
      }
    }

    this.chains = chains;
  }

  makeText(numWords = 100) {
    let keys = Object.keys(this.chains);
    let key = keys[Math.floor(Math.random() * keys.length)];
    let text = [];

    while (text.length < numWords && key !== null) {
      text.push(key);

      key = this.chains[key][Math.floor(Math.random() * this.chains[key].length)];
    }

    return text.join(' ');
  }
}

module.exports = {
  MarkovMachine,
};