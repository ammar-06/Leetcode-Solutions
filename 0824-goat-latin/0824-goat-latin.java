class Solution {
    public String toGoatLatin(String sentence) {
        StringBuilder res = new StringBuilder();
        String[] words = sentence.split(" ");
        String vowels = "aeiouAEIOU";

        for (int i = 0; i < words.length; i++) {
            String w = words[i];

            if (vowels.indexOf(w.charAt(0)) != -1) {
                w = w + "ma";
            } else {
                w = w.substring(1) + w.charAt(0) + "ma";
            }

            for (int j = 0; j <= i; j++) {
                w += "a";
            }

            res.append(w);
            if (i != words.length - 1) res.append(" ");
        }

        return res.toString();
    }
}