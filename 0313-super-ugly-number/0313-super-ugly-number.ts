function nthSuperUglyNumber(n: number, primes: number[]): number {
    const k = primes.length;
    const ugly = new Array<number>(n);
    ugly[0] = 1;

    const idx = new Array<number>(k).fill(0);
    const next = [...primes];

    for (let i = 1; i < n; i++) {
        let minVal = next[0];
        for (let j = 1; j < k; j++) {
            if (next[j] < minVal) minVal = next[j];
        }

        ugly[i] = minVal;

        for (let j = 0; j < k; j++) {
            if (next[j] === minVal) {
                idx[j]++;
                next[j] = ugly[idx[j]] * primes[j];
            }
        }
    }

    return ugly[n - 1];
}