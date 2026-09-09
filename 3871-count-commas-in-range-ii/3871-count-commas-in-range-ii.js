/**
 * @param {number} n
 * @return {number}
 */
var countCommas = function(n) {
    let total = 0;
    let power = 1000;

    while (power <= n) {
        total += n - power + 1;
        power *= 1000;
    }

    return total;
};