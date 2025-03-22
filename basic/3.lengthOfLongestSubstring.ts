// https://leetcode.com/problems/longest-substring-without-repeating-characters/

function lengthOfLongestSubstring(s: string): number {
  /**
   * 1. 문자열의 시작점과 마지막 점을 찾는다.
   * 2. 문자가 전에 나온 적이 있고 그 위치가 시작점보다 뒤면 시작점의 위치를 옮긴다.
   * 3. 그리고 시작점과 마지막 점의 길이를 구한다.
   * 4. 그 길이가 가장 긴 길이를 찾는다
   *
   * 1. Find the start and end positions of the string.
   * 2. If a character has appeared before and its position is after the start, move the start position.
   * 3. Calculate the length between the start and end positions.
   * 4. Keep track of the longest length found.
   */
  const checkMap = new Map();
  let largetLenght = 0; // result
  let left = 0;
  for (let right = 1; right <= s.length; right++) {
    const c = s[right - 1];

    let before = checkMap.get(c);
    if (before && left < before) left = before;

    let length = right - left;
    if (largetLenght < length) largetLenght = length;

    checkMap.set(c, right);
  }

  return largetLenght;
}
