class Solution {
    public int binaryGap(int n) {
        int last = -1, ans = 0, idx = 0;

        while (n > 0) {
            if ((n & 1) == 1) {
                if (last != -1) {
                    ans = Math.max(ans, idx - last);
                }
                last = idx;
            }
            idx++;
            n >>= 1;
        }

        return ans;
    }
}