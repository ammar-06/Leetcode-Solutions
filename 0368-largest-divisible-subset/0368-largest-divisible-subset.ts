function largestDivisibleSubset(nums: number[]): number[] {
    nums.sort((a, b) => a - b);

    const n = nums.length;
    const dp = new Array(n).fill(1);
    const prev = new Array(n).fill(-1);

    let maxLen = 1;
    let maxIdx = 0;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] % nums[j] === 0 && dp[j] + 1 > dp[i]) {
                dp[i] = dp[j] + 1;
                prev[i] = j;
            }
        }
        if (dp[i] > maxLen) {
            maxLen = dp[i];
            maxIdx = i;
        }
    }

    const res: number[] = [];
    while (maxIdx !== -1) {
        res.push(nums[maxIdx]);
        maxIdx = prev[maxIdx];
    }

    return res.reverse();
}