import java.util.*;

class Solution {
    public int[] fairCandySwap(int[] aliceSizes, int[] bobSizes) {
        int sumA = 0, sumB = 0;

        for (int a : aliceSizes) sumA += a;
        for (int b : bobSizes) sumB += b;

        int diff = (sumA - sumB) / 2;

        Set<Integer> setB = new HashSet<>();
        for (int b : bobSizes) setB.add(b);

        for (int a : aliceSizes) {
            int target = a - diff;
            if (setB.contains(target)) {
                return new int[]{a, target};
            }
        }

        return new int[]{};
    }
}