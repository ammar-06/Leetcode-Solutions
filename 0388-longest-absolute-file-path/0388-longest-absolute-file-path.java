class Solution {
    public int lengthLongestPath(String input) {
        String[] parts = input.split("\n");
        int[] pathLen = new int[parts.length + 1];
        int max = 0;

        for (String part : parts) {
            int level = 0;
            while (part.charAt(level) == '\t') {
                level++;
            }

            String name = part.substring(level);

            if (name.contains(".")) {
                max = Math.max(max, pathLen[level] + name.length());
            } else {
                pathLen[level + 1] = pathLen[level] + name.length() + 1;
            }
        }

        return max;
    }
}