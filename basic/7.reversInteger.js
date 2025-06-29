// https://leetcode.com/problems/reverse-integer/

/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
  let isNegative = x < 0 ? true : false;
  let usedX = Math.abs(x);

  let xReverseNum = Number(String(usedX).split('').reverse().join(''));

  if (xReverseNum > 2 ** 31) return 0;
  return isNegative ? xReverseNum * -1 : xReverseNum;
};
