// https://leetcode.com/problems/median-of-two-sorted-arrays/

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
  /**
   * 1. 정렬된 배열 2개의 전체 길이를 찾는다.
   * 2. 배열을 전체의 절반 길이까지만 합친다
   * 3. 절반까지 합친 배열에서 홀수면 마지막 1개 짝수면 마지막 2개를 가져와서 중앙값을 찾는다
   *
   * 1. Find the total length of the two sorted arrays.
   * 2. Merge them until reaching half of the total length.
   * 3. From the halfMergedArray, take the last element if the total length is odd, or the last two elements if even, to find the median.
   */

  const allLength = nums1.length + nums2.length;
  const allLengthmeidan = Math.floor(allLength / 2);

  const isOdd = !!(allLength % 2);

  let idx1 = 0;
  let idx2 = 0;

  let halfMergedArray = new Array(allLengthmeidan);
  for (let i = 0; i <= allLengthmeidan; i++) {
    const t1 = nums1[idx1];
    const t2 = nums2[idx2];
    if (typeof t2 !== 'number') {
      halfMergedArray[i] = t1;
      idx1++;
      continue;
    }
    if (typeof t1 !== 'number') {
      halfMergedArray[i] = t2;
      idx2++;
      continue;
    }
    if (t1 <= t2) {
      halfMergedArray[i] = t1;
      idx1++;
      continue;
    }
    if (t1 >= t2) {
      halfMergedArray[i] = t2;
      idx2++;
      continue;
    }
  }

  return isOdd
    ? halfMergedArray.at(-1)
    : (halfMergedArray.at(-1) + halfMergedArray.at(-2)) / 2;
};
