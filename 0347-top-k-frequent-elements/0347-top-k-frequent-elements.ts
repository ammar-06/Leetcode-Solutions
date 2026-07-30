function topKFrequent(nums: number[], k: number): number[] {
    const freq = new Map<number, number>();

    for (const num of nums) {
        freq.set(num, (freq.get(num) || 0) + 1);
    }

    const buckets: number[][] = Array(nums.length + 1)
        .fill(0)
        .map(() => []);

    for (const [num, count] of freq) {
        buckets[count].push(num);
    }

    const res: number[] = [];
    for (let i = buckets.length - 1; i >= 0 && res.length < k; i--) {
        for (const num of buckets[i]) {
            res.push(num);
            if (res.length === k) break;
        }
    }

    return res;
}