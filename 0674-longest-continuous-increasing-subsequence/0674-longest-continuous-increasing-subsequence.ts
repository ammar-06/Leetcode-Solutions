function findLengthOfLCIS(nums: number[]): number {
    let maxLen = 1;
    let curr = 1;

    for (let i = 1; i < nums.length; i++) {
        if (nums[i] > nums[i - 1]) {
            curr++;
        } else {
            curr = 1;
        }
        if (curr > maxLen) maxLen = curr;
    }

    return maxLen;
}