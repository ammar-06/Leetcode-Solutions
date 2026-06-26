class Solution {
    public int profitableSchemes(int n, int minProfit, int[] group, int[] profit) {
        int MOD = 1_000_000_007;
        int m = group.length;

        int[][] dp = new int[n + 1][minProfit + 1];
        dp[0][0] = 1;

        for (int k = 0; k < m; k++) {
            int g = group[k];
            int p = profit[k];

            int[][] next = new int[n + 1][minProfit + 1];

            for (int i = 0; i <= n; i++) {
                for (int j = 0; j <= minProfit; j++) {
                    if (dp[i][j] == 0) continue;

                    // not take
                    next[i][j] = (next[i][j] + dp[i][j]) % MOD;

                    // take
                    if (i + g <= n) {
                        int np = Math.min(minProfit, j + p);
                        next[i + g][np] = (next[i + g][np] + dp[i][j]) % MOD;
                    }
                }
            }

            dp = next;
        }

        long ans = 0;
        for (int i = 0; i <= n; i++) {
            ans = (ans + dp[i][minProfit]) % MOD;
        }

        return (int) ans;
    }
}