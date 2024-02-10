/** product: calculate the product of an array of numbers. */

function product(nums) {
  if(nums.length === 0) {
    return 1;
  }

  return nums.pop() * product(nums);
}

/** longest: return the length of the longest word in an array of words. */

function longest(words) {
  if (words.length === 0) {
    return 0;
  }

  return Math.max(words.pop().length, longest(words));
}

/** everyOther: return a string with every other letter. */

function everyOther(str) {
  if (str.length <= 1) {
    return str;
  }

  return str[0] + everyOther(str.slice(2));
}

/** isPalindrome: checks whether a string is a palindrome or not. */

function isPalindrome(str) {
  if (str.length <= 1) {
    return true;
  } else if (str[0] !== str[str.length - 1]) {
    return false;
  }
  
  return isPalindrome(str.slice(1, -1));
}

/** findIndex: return the index of val in arr (or -1 if val is not present). */

function findIndex(arr, val) {
  const index = arr.length - 1;

  if (index < 0) {
    return -1;
  } else if (arr[index] === val) {
    return findIndex(arr.slice(0, index), val) === -1 ? index : findIndex(arr.slice(0, index), val);
  }

  return findIndex(arr.slice(0, index), val);
}

/** revString: return a copy of a string, but in reverse. */

function revString(str) {
  if(str === '' || str.length === 1) {
    return str;
  }

  return str.slice(str.length - 1) + revString(str.slice(0, str.length - 1));
}

/** gatherStrings: given an object, return an array of all of the string values. */

function gatherStrings(obj) {
  let strings = [];
  
  for (let key in obj) {
    if (typeof obj[key] === 'string') {
      strings.push(obj[key]);
    } else if (typeof obj[key] === 'object') {
      strings = strings.concat(gatherStrings(obj[key]));
    }
  }
  
  return strings;
}

/** binarySearch: given a sorted array of numbers, and a value, return the index of that value (or -1 if val is not present). */

function binarySearch(arr, val) {
  let start = 0, end = arr.length - 1;

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);

    if (arr[mid] === val) {
      return mid;
    } else if (arr[mid] < val) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  return -1;
}

module.exports = {
  product,
  longest,
  everyOther,
  isPalindrome,
  findIndex,
  revString,
  gatherStrings,
  binarySearch
};
