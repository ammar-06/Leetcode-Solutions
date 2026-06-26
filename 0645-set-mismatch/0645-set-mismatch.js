/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findErrorNums = function(nums) {
    const seen = new Array(nums.length + 1).fill(false);
    let dup = 0, miss = 0;

    for (const num of nums) {
        if (seen[num]) dup = num;
        seen[num] = true;
    }

    for (let i = 1; i <= nums.length; i++) {
        if (!seen[i]) {
            miss = i;
            break;
        }
    }

    return [dup, miss];
};