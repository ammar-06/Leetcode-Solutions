class Solution {
public:
    bool detectCapitalUse(string word) {
        int upper = 0;
        for (char c : word) {
            if (isupper(c)) upper++;
        }
        return upper == word.size() || upper == 0 || (upper == 1 && isupper(word[0]));
    }
};