import java.util.*;

class Solution {
    public String[] uncommonFromSentences(String s1, String s2) {
        Map<String, Integer> map = new HashMap<>();

        for (String w : s1.split(" ")) {
            map.put(w, map.getOrDefault(w, 0) + 1);
        }

        for (String w : s2.split(" ")) {
            map.put(w, map.getOrDefault(w, 0) + 1);
        }

        List<String> res = new ArrayList<>();

        for (Map.Entry<String, Integer> e : map.entrySet()) {
            if (e.getValue() == 1) {
                res.add(e.getKey());
            }
        }

        return res.toArray(new String[0]);
    }
}