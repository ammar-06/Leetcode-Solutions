class Solution:
    def subsetsWithDup(self, nums: List[int]) -> List[List[int]]:
        nums.sort()
        res = [[]]
        start = 0
        
        for i, num in enumerate(nums):
            if i > 0 and nums[i] == nums[i - 1]:
                curr = [subset + [num] for subset in res[start:]]
            else:
                curr = [subset + [num] for subset in res]
            start = len(res)
            res.extend(curr)
        
        return res