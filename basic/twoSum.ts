// ref: https://leetcode.com/problems/two-sum/

/**
 * # 1. Basic
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  /*
   * 1. Select two unsorted numbers.
   * 2. Add the two numbers and check if they are equal to the target.
   */
  for (let i = 0; i < nums.length; i++) {
    let s1 = nums[i];
    for (let j = i + 1; j < nums.length; j++) {
      let s2 = nums[j];

      if (s1 + s2 === target) return [i, j];
    }
  }
};
