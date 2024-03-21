function merge(arrOne, arrTwo) {
    let merged = [];
    let i = 0;
    let j = 0;

    while (i < arrOne.length && j < arrTwo.length) {
        if (arrOne[i] < arrTwo[j]) {
            merged.push(arrOne[i]);
            i++;
        } else {
            merged.push(arrTwo[j]);
            j++;
        }
    }

    while (i < arrOne.length) {
        merged.push(arrOne[i]);
        i++;
    }

    while (j < arrTwo.length) {
        merged.push(arrTwo[j]);
        j++;
    }

    return merged;
}

function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const mid = Math.floor(arr.length / 2);
    const leftHalf = arr.slice(0, mid);
    const rightHalf = arr.slice(mid);

    const sortedLeft = mergeSort(leftHalf);
    const sortedRight = mergeSort(rightHalf);

    return merge(sortedLeft, sortedRight);
}

module.exports = { merge, mergeSort};