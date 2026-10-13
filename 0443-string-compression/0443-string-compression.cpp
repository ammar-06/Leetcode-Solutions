class Solution {
public:
    int compress(vector<char>& chars) {
        int n = chars.size();
        int write = 0, i = 0;
        while (i < n) {
            char c = chars[i];
            int j = i;
            while (j < n && chars[j] == c) j++;
            int count = j - i;
            chars[write++] = c;
            if (count > 1) {
                int start = write;
                while (count > 0) {
                    chars[write++] = '0' + count % 10;
                    count /= 10;
                }
                reverse(chars.begin() + start, chars.begin() + write);
            }
            i = j;
        }
        return write;
    }
};