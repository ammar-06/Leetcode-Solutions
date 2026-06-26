import java.util.*;

class Solution {
    public int uniqueMorseRepresentations(String[] words) {
        String[] morse = {
            ".-","-...","-.-.","-..",".","..-.","--.","....","..",".---",
            "-.-",".-..","--","-.","---",".--.","--.-",".-.","...","-",
            "..-","...-",".--","-..-","-.--","--.."
        };

        HashSet<String> set = new HashSet<>();

        for (String w : words) {
            StringBuilder sb = new StringBuilder();
            for (char c : w.toCharArray()) {
                sb.append(morse[c - 'a']);
            }
            set.add(sb.toString());
        }

        return set.size();
    }
}