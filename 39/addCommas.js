function addCommas(number) {
    const isNegative = String(number).includes('-');
    const value = isNegative ? String(number).substring(1) : String(number);
    const decimalIndex = value.split('').findIndex(val => val === '.');
    const hasDecimal = decimalIndex !== -1;
    let result = "", counter = 0;

    for(let i = (hasDecimal ? decimalIndex - 1 : value.length - 1); i >= 0; i--) {
        const char = value.charAt(i);

        if(counter === 3) {
            result += ',' + char;
            counter = 1;
        } else {
            result += char;
            counter++;
        }
    }

    return (isNegative ? '-' : '') + result.split('').reverse().join('') + (hasDecimal ? value.substring(decimalIndex) : '');
}

module.exports = addCommas;