function wiggleSort(nums: number[]): void {
    const arr = [...nums].sort((a, b) => a - b);
    const n = nums.length;
    let left = Math.floor((n - 1) / 2);
    let right = n - 1;

    for (let i = 0; i < n; i++) {
        if (i % 2 === 0) {
            nums[i] = arr[left--];
        } else {
            nums[i] = arr[right--];
        }
    }
}