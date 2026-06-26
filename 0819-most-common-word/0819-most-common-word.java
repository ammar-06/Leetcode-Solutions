import java.util.*;

class Solution {
    public String mostCommonWord(String paragraph, String[] banned) {
        Set<String> ban = new HashSet<>();
        for (String b : banned) ban.add(b);

        Map<String, Integer> freq = new HashMap<>();

        StringBuilder sb = new StringBuilder();
        paragraph = paragraph.toLowerCase();

        for (int i = 0; i < paragraph.length(); i++) {
            char c = paragraph.charAt(i);

            if (Character.isLetter(c)) {
                sb.append(c);
            } else {
                if (sb.length() > 0) {
                    String w = sb.toString();
                    if (!ban.contains(w)) {
                        freq.put(w, freq.getOrDefault(w, 0) + 1);
                    }
                    sb.setLength(0);
                }
            }
        }

        if (sb.length() > 0) {
            String w = sb.toString();
            if (!ban.contains(w)) {
                freq.put(w, freq.getOrDefault(w, 0) + 1);
            }
        }

        String ans = "";
        int max = 0;

        for (Map.Entry<String, Integer> e : freq.entrySet()) {
            if (e.getValue() > max) {
                max = e.getValue();
                ans = e.getKey();
            }
        }

        return ans;
    }
}