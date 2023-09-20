const double = (arr) => arr.map(value => value * 2);

const squareAndFindEvens = (numbers) => numbers.map(value => value * value).filter(value => value % 2 === 0);