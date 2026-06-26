class Solution {
    public int[] numberOfLines(int[] widths, String s) {
        int lines = 1;
        int curr = 0;

        for (char c : s.toCharArray()) {
            int w = widths[c - 'a'];
            if (curr + w > 100) {
                lines++;
                curr = w;
            } else {
                curr += w;
            }
        }

        return new int[]{lines, curr};
    }
}