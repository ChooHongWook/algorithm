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
 * Runtime : 1ms (Beats:99.90%)
 * Memory : 59.07MB (Beats: 44.81%)
 *
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function (s, numRows) {
  if (numRows === 1 || s.length < numRows) return s;

  let rowList = new Array(numRows).fill("");
  let rowIdx = 0;

  let sIdx = 0;

  while (sIdx < s.length) {
    // increase
    for (; rowIdx < numRows - 1 && sIdx < s.length; rowIdx++, sIdx++) {
      rowList[rowIdx] += s[sIdx];
    }
    // decrease
    for (; rowIdx > 0 && sIdx < s.length; rowIdx--, sIdx++) {
      rowList[rowIdx] += s[sIdx];
    }
  }

  return rowList.join("");
};

/**
 * fix revert
 * @param {*} s
 * @param {*} numRows
 * @returns
 */
var convert = function (s, numRows) {
  if (numRows === 1 || s.length < numRows) return s;

  let rowList = new Array(numRows).fill("");
  let rowIdx = 0;

  let reverse = false;

  for (let i = 0; i < s.length; i++) {
    rowList[rowIdx] += s[i];

    // increase or decrease
    reverse ? rowIdx-- : rowIdx++;
    if (rowIdx === numRows - 1 || rowIdx === 0) reverse = !reverse;
  }

  return rowList.join("");
};
