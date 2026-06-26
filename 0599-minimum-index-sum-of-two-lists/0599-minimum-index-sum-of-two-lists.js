/**
 * @param {string[]} list1
 * @param {string[]} list2
 * @return {string[]}
 */
var findRestaurant = function(list1, list2) {
    const map = new Map();
    for (let i = 0; i < list1.length; i++) {
        map.set(list1[i], i);
    }

    let minSum = Infinity;
    const res = [];

    for (let j = 0; j < list2.length; j++) {
        if (map.has(list2[j])) {
            const sum = map.get(list2[j]) + j;
            if (sum < minSum) {
                minSum = sum;
                res.length = 0;
                res.push(list2[j]);
            } else if (sum === minSum) {
                res.push(list2[j]);
            }
        }
    }

    return res;
};