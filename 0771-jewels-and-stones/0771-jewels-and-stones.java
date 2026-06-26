class Solution {
    public int numJewelsInStones(String jewels, String stones) {
        boolean[] isJewels = new boolean[128];
        for (char c : jewels.toCharArray()) {
            isJewels[c] = true;
        }

        int count = 0;
        for (char c : stones.toCharArray()) {
            if (isJewels[c]) count++;
        }
        return count;
    }
}