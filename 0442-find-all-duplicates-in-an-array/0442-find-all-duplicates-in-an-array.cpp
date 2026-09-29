class Solution {
public:
    vector<int> findDuplicates(vector<int>& nums) {
        vector<int> ans;

        for (int x : nums) {
            int idx = abs(x) - 1;

            if (nums[idx] < 0)
                ans.push_back(abs(x));
            else
                nums[idx] = -nums[idx];
        }

        return ans;
    }
};