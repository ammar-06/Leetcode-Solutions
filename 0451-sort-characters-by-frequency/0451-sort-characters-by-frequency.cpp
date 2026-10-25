class Solution {
public:
    string frequencySort(string s) {
        vector<int> freq(128, 0);
        for (char c : s) freq[c]++;
        vector<char> chars;
        for (int c = 0; c < 128; c++) {
            if (freq[c]) chars.push_back((char)c);
        }
        sort(chars.begin(), chars.end(), [&](char a, char b) {
            return freq[a] > freq[b];
        });
        string res;
        res.reserve(s.size());
        for (char c : chars) res.append(freq[c], c);
        return res;
    }
};