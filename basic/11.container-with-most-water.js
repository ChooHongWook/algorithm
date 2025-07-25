// https://leetcode.com/problems/regular-expression-matching/

/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    let result = 0  
    for(let idx1 = 0; idx1 < height.length-1; idx1++) {
        for(let idx2 = idx1+1; idx2 < height.length; idx2++) {
            let h1 = height[idx1]
            let h2 = height[idx2]

            let h = Math.min(h1, h2)

            let area = h * (idx2 - idx1)
            if(result < area) result = area
        }
    } 
    return result
};

/**
 * optimize 1
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    let result = 0
    let left = 0
    let right = height.length-1

    while (left < right) {
        let area = Math.min(height[left], height[right]) * (right - left)
        if (area > result)result = area
        height[left] <= height[right] ? left++ : right--
    }
    
    return result
};
