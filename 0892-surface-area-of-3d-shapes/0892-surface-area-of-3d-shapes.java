class Solution {
    public int surfaceArea(int[][] grid) {
        int n = grid.length;
        int res = 0;

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                int v = grid[i][j];
                if (v > 0) {
                    res += 4 * v + 2;

                    if (i > 0) res -= 2 * Math.min(v, grid[i - 1][j]);
                    if (j > 0) res -= 2 * Math.min(v, grid[i][j - 1]);
                }
            }
        }

        return res;
    }
}