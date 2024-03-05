function unroll(squareArray) {
    const result = [];

    while (squareArray.length) {
        result.push(...squareArray.shift());

        for (let row of squareArray) {
            result.push(row.pop());
        }

        if (squareArray.length) {
            result.push(...squareArray.pop().reverse());
        }

        for (let i = squareArray.length - 1; i >= 0; i--) {
            if (squareArray[i].length) {
                result.push(squareArray[i].shift());
            }
        }
    }

    return result;
}

module.exports = unroll;
