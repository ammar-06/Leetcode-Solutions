class Solution {
public:
    int minInsertions(string s) {
        int ins = 0, need = 0;
        int n = s.size();
        for (int i = 0; i < n; i++) {
            if (s[i] == '(') {
                need += 2;
                if (need % 2 == 1) {
                    ins++;
                    need--;
                }
            } else {
                need--;
                if (need == -1) {
                    ins++;
                    need = 1;
                }
            }
        }
        return ins + need;
    }
};