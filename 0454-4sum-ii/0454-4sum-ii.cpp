class Solution {
public:
    int fourSumCount(vector<int>& nums1, vector<int>& nums2, vector<int>& nums3, vector<int>& nums4) {
        unordered_map<int, int> cnt;
        cnt.reserve(nums1.size() * nums2.size());
        for (int a : nums1)
            for (int b : nums2)
                cnt[a + b]++;
        int res = 0;
        for (int c : nums3) {
            for (int d : nums4) {
                auto it = cnt.find(-(c + d));
                if (it != cnt.end()) res += it->second;
            }
        }
        return res;
    }
};