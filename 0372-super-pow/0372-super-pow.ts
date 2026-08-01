function superPow(a: number, b: number[]): number {
    const MOD = 1337;

    const modPow = (x: number, n: number): number => {
        x %= MOD;
        let res = 1;
        while (n > 0) {
            if (n & 1) res = (res * x) % MOD;
            x = (x * x) % MOD;
            n >>= 1;
        }
        return res;
    };

    let res = 1;
    a %= MOD;

    for (const digit of b) {
        res = (modPow(res, 10) * modPow(a, digit)) % MOD;
    }

    return res;
}