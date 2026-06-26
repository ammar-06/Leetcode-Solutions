class Solution {
    public int superEggDrop(int k, int n) {
        int[][] dp = new int[n + 1][k + 1];

        int m = 0;

        while (dp[m][k] < n) {
            m++;
            for (int j = 1; j <= k; j++) {
                dp[m][j] = dp[m - 1][j - 1] + dp[m - 1][j] + 1;
            }
        }

        return m;
    }
}