import java.util.*;

class Solution {
    public String orderlyQueue(String s, int k) {
        if (k > 1) {
            char[] arr = s.toCharArray();
            Arrays.sort(arr);
            return new String(arr);
        }

        String best = s;
        String cur = s;

        for (int i = 1; i < s.length(); i++) {
            cur = cur.substring(1) + cur.charAt(0);
            if (cur.compareTo(best) < 0) {
                best = cur;
            }
        }

        return best;
    }
}