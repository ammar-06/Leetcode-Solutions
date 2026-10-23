class Solution {
public:
    int sortPermutation(vector<int>& nums) {
        int res = -1;
        for (int i = 0; i < (int)nums.size(); i++) {
            if (nums[i] != i) res &= nums[i];
        }
        return res == -1 ? 0 : res;
    }
};