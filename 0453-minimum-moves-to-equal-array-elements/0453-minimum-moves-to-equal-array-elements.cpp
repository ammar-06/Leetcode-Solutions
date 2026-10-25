class Solution {
public:
    int minMoves(vector<int>& nums) {
        int mn = *min_element(nums.begin(), nums.end());
        long long res = 0;
        for (int x : nums) res += (long long)x - mn;
        return (int)res;
    }
};