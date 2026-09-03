/**
 * @param {number[]} nums1
 * @return {boolean}
 */
var uniformArray = function(nums1) {
    let minOdd = Infinity;
    let minEven = Infinity;

    for (const x of nums1) {
        if (x & 1) {
            minOdd = Math.min(minOdd, x);
        } else {
            minEven = Math.min(minEven, x);
        }
    }

    if (minEven === Infinity || minOdd === Infinity) return true;

    return minOdd < minEven;
};