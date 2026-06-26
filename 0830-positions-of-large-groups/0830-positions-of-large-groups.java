import java.util.*;

class Solution {
    public List<List<Integer>> largeGroupPositions(String s) {
        List<List<Integer>> res = new ArrayList<>();

        int n = s.length();
        int i = 0;

        while (i < n) {
            int j = i;
            while (j < n && s.charAt(j) == s.charAt(i)) j++;

            if (j - i >= 3) {
                res.add(Arrays.asList(i, j - 1));
            }

            i = j;
        }

        return res;
    }
}