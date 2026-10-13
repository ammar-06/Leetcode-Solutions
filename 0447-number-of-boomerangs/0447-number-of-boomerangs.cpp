class Solution {
public:
    int numberOfBoomerangs(vector<vector<int>>& points) {
        int res = 0;
        for (auto& p : points) {
            unordered_map<long long, int> cnt;
            for (auto& q : points) {
                long long dx = p[0] - q[0], dy = p[1] - q[1];
                cnt[dx * dx + dy * dy]++;
            }
            for (auto& [d, c] : cnt) res += c * (c - 1);
        }
        return res;
    }
};