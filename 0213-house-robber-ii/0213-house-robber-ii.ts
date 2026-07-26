function rob(nums: number[]): number {
    const n = nums.length;
    if (n === 1) return nums[0];

    const robRange = (start: number, end: number): number => {
        let prev1 = 0;
        let prev2 = 0;

        for (let i = start; i <= end; i++) {
            const curr = Math.max(prev1, prev2 + nums[i]);
            prev2 = prev1;
            prev1 = curr;
        }

        return prev1;
    };

    return Math.max(robRange(0, n - 2), robRange(1, n - 1));
}