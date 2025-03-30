// https://leetcode.com/problems/zigzag-conversion/

/**
 * 1. Iterate through `s` for its entire length.
 * 2. Traverse the indices in a zigzag pattern, alternating between increasing and decreasing phases.
 * 3. Rearrange the characters based on their positions in `numRows`.
 *
 * 1. `s`의 길이 만큼 반복 조회한다.
 * 2. 숫자를 지그재그로로 반복한다(증가 단계 감소 단계 2개로 구분).
 * 3. numRows 위치 별로 글자 순서를 재배열 한다
 *
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function (s, numRows) {
  if (numRows <= 1) return s;

  let idx = 0;
  let rowList = new Array(numRows).fill("");
  let row = 0;
  while (idx < s.length) {
    // increase
    for (; row < numRows - 1 && idx < s.length; row++, idx++) {
      rowList[row] += s[idx];
    }
    // decrease
    for (; row > 0 && idx < s.length; row--, idx++) {
      rowList[row] += s[idx];
    }
  }

  return rowList.join("");
};

// console.log("result:", convert("AB", 1));
