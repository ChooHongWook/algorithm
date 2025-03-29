// https://leetcode.com/problems/longest-palindromic-substring/

/**
 * 1. 글자들을 하나씩 돈다
 * 2. 회문의 중간인지 확인한다. 바로 앞과 뒤의 문자를 비교해서 같으면 그다음 앞뒤도 체크
 * 3. 짝수 회문인지 홀수 회문인지 나누어서 체크
 * 4. 이전에 저장된 회문과 비교해서 긴 회문을 저장한다
 * 5. 글자가 마지막까지 조회하면 저장된 회문을 출력한다
 *
 * 1. Iterate through each character in the string.  
 * 2. Check if it's the middle of a palindrome by comparing the characters before and after it; if they match, continue checking outward.  
 * 3. Distinguish between even-length and odd-length palindromes.  
 * 4. Compare with the previously stored palindrome and keep the longest one.  
 * 5. Once all characters are checked, output the stored palindrome.  

 *
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  if (s.length <= 1) return s;
  let result = s[0];

  for (let i = 0; i < s.length; i++) {
    if (isOddPalindromeCenter(i, s)) {
      let curPalindrome = getOddPalindrome(i, s);
      if (result.length < curPalindrome.length) result = curPalindrome;
    }
    if (isEvenPalindromeCenter(i, s)) {
      let curPalindrome = getEvenPalindrome(i, s);
      if (result.length < curPalindrome.length) result = curPalindrome;
    }
  }
  return result;
};

const isOddPalindromeCenter = (i, s) => {
  return s[i - 1] === s[i + 1];
};

const getOddPalindrome = (i, s) => {
  let count = 1;
  while (s[i - count] && s[i - count] === s[i + count]) {
    count++;
  }
  count--;
  return s.slice(i - count, i + count + 1);
};
const isEvenPalindromeCenter = (i, s) => {
  return s[i] === s[i + 1];
};

const getEvenPalindrome = (i, s) => {
  let count = 1;
  while (s[i - count + 1] && s[i - count + 1] === s[i + count]) {
    count++;
  }
  count--;
  return s.slice(i - count + 1, i + count + 1);
};
