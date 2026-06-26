function findShortestSubArray(nums: number[]): number {
    const count = new Map<number, number>();
    const first = new Map<number, number>();
    const last = new Map<number, number>();

    let degree = 0;

    for (let i = 0; i < nums.length; i++) {
        const x = nums[i];

        if (!first.has(x)) first.set(x, i);
        last.set(x, i);

        const c = (count.get(x) || 0) + 1;
        count.set(x, c);

        if (c > degree) degree = c;
    }

    let ans = nums.length;

    for (const [num, freq] of count) {
        if (freq === degree) {
            const len = (last.get(num)! - first.get(num)!) + 1;
            if (len < ans) ans = len;
        }
    }

    return ans;
}