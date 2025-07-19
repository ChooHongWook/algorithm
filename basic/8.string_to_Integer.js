// https://leetcode.com/problems/string-to-integer-atoi/

/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function (s) {
  const isNaNC = (j) => {
    if (j === " ") return true;
    return isNaN(j);
  };

  let isNegative = false;
  let stringNum = "";
  for (let i = 0; i < s.length; i++) {
    let char = s[i];
    let nextChar = s[i + 1];

    if (char === " ") continue;
    if (char === "+" || char === "-") {
      if (isNaNC(nextChar)) break;
      if (char === "-") isNegative = true;
      continue;
    }
    if (isNaNC(char)) break;

    stringNum += char;

    if (isNaNC(nextChar)) break;
  }

  const result = isNegative ? Number(stringNum) * -1 : Number(stringNum);

  const minNum = -(2 ** 31);
  if (result < minNum) return minNum;

  const maxNum = 2 ** 31 - 1;
  if (result > maxNum) return maxNum;

  return result;
};
