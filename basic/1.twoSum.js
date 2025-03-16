// ref: https://leetcode.com/problems/two-sum/

/**
 * # 1. Basic
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum1 = function (nums, target) {
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
// ------------------------------------------------------------------------------------
/**
 * # 2. Optimize
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum2 = function (nums, target) {
  /*
   * 1. Sequentially find the parameter (target value).
   * 2. Check if the target parameter exists in the map object.
   * 3. If not, insert the argument into the map object and proceed to find the next value.
   */
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
};
