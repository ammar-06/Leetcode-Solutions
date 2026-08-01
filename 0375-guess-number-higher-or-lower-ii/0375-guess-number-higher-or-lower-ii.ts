function getMoneyAmount(n: number): number {
    const dp: number[][] = Array.from({ length: n + 2 }, () =>
        Array(n + 2).fill(0)
    );

    for (let len = 2; len <= n; len++) {
        for (let l = 1; l + len - 1 <= n; l++) {
            const r = l + len - 1;
            dp[l][r] = Infinity;

            for (let x = l; x <= r; x++) {
                const cost = x + Math.max(dp[l][x - 1], dp[x + 1][r]);
                dp[l][r] = Math.min(dp[l][r], cost);
            }
        }
    }

    return dp[1][n];
}