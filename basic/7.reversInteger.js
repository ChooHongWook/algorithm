// https://leetcode.com/problems/reverse-integer/

/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    let usedX = x
    let isNegative = false
    if(x < 0){
        isNegative = true
        usedX *= -1
    }
    let xReverseStr = String(usedX).split('').reverse().join('')
    let xReverseNum = Number(xReverseStr)

    if(isNegative) xReverseNum *= -1

    let result = xReverseNum

    if( result < -(2 ** 31) || result > 2 ** 31 ) return 0
    return result
};