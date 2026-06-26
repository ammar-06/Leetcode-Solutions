import java.util.*;

class Solution {
    public int sumSubseqWidths(int[] nums) {
        int MOD = 1_000_000_007;
        Arrays.sort(nums);

        long res = 0;
        long pow = 1;
        int n = nums.length;

        for (int i = 0; i < n; i++) {
            res = (res + nums[i] * pow) % MOD;
            pow = (pow * 2) % MOD;
        }

        pow = 1;
        for (int i = n - 1; i >= 0; i--) {
            res = (res - nums[i] * pow % MOD + MOD) % MOD;
            pow = (pow * 2) % MOD;
        }

        return (int) res;
    }
}