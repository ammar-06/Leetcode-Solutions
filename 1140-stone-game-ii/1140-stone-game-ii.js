/**
 * @param {number[]} piles
 * @return {number}
 */
var stoneGameII = function(piles) {
    const n = piles.length;
    const suffix = new Array(n + 1).fill(0);

    for (let i = n - 1; i >= 0; i--) {
        suffix[i] = suffix[i + 1] + piles[i];
    }

    const dp = Array.from({ length: n }, () => new Array(n + 1).fill(-1));

    function dfs(i, M) {
        if (i >= n) return 0;
        if (2 * M >= n - i) return suffix[i];
        if (dp[i][M] !== -1) return dp[i][M];

        let best = 0;

        for (let X = 1; X <= 2 * M && i + X <= n; X++) {
            best = Math.max(
                best,
                suffix[i] - dfs(i + X, Math.max(M, X))
            );
        }

        return dp[i][M] = best;
    }

    return dfs(0, 1);
};