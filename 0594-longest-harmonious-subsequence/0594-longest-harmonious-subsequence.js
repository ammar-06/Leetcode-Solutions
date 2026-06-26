/**
 * @param {number[]} nums
 * @return {number}
 */
var findLHS = function(nums) {
    const map = new Map();
    let ans = 0;

    for (const num of nums) {
        map.set(num, (map.get(num) || 0) + 1);
    }

    for (const [num, count] of map) {
        if (map.has(num + 1)) {
            ans = Math.max(ans, count + map.get(num + 1));
        }
    }

    return ans;
};