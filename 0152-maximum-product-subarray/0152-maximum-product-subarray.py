class Solution:
    def maxProduct(self, nums: List[int]) -> int:
        mx = mn = ans = nums[0]
        for x in nums[1:]:
            if x < 0:
                mx, mn = mn, mx
            mx = max(x, mx * x)
            mn = min(x, mn * x)
            ans = max(ans, mx)
        return ans