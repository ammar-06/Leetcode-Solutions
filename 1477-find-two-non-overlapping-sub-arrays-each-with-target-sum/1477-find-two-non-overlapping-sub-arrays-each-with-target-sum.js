var minSumOfLengths = function(arr, target) {
    const n = arr.length;
    const dp = new Array(n).fill(Infinity);
    let res = Infinity;
    let left = 0, sum = 0;
    
    for (let right = 0; right < n; right++) {
        sum += arr[right];
        while (sum > target) {
            sum -= arr[left];
            left++;
        }
        if (sum === target) {
            const currLen = right - left + 1;
            if (left > 0 && dp[left - 1] !== Infinity) {
                res = Math.min(res, dp[left - 1] + currLen);
            }
            dp[right] = Math.min(right > 0 ? dp[right - 1] : Infinity, currLen);
        } else {
            dp[right] = right > 0 ? dp[right - 1] : Infinity;
        }
    }
    
    return res === Infinity ? -1 : res;
};