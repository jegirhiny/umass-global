const hasDuplicate = (array) => {
    let set = new Set();

    for(const value of array) {
        if(set.has(value)) {
            return true;
        }

        set.add(value);
    }

    return false;
};

const vowelCount = (string) => {
    const vowels = 'aeiou';
    let map = new Map();

    for(let char of string.toLowerCase()) {
        if(vowels.includes(char)) {
            if(map.has(char)) {
                map.set(char, map.get(char) + 1);
            } else {
                map.set(char, 1);
            }
        }
    }

    return map;
};