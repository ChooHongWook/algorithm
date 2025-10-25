// https://leetcode.com/problems/palindrome-number/

/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
  if (x < 0) return false;

  let strX = "" + x;

  let isOdd = strX.length % 2;
  let midInt = Math.floor(strX.length / 2);

  let leftHalf = strX.slice(0, midInt);
  let rightHalf = strX.slice(midInt + isOdd);

  let reverseRightHalf = Array.from(rightHalf).reverse().join("");
  return leftHalf === reverseRightHalf;
};

// ---------------------------------------------------------------------------------------------------------

/**
 * optimize
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
  if (x < 0) return false;

  let strX = "" + x;

  let leftIdx = 0;
  let rightIdx = strX.length - 1;

  while (leftIdx < rightIdx) {
    if (strX[leftIdx] !== strX[rightIdx]) return false;

    leftIdx++;
    rightIdx--;
  }
  return true;
};
