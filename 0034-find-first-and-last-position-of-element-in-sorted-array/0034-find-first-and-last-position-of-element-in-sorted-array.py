from typing import List

class Solution:
    def searchRange(self, nums: List[int], target: int) -> List[int]:
        def lower():
            l, r = 0, len(nums)
            while l < r:
                m = (l + r) // 2
                if nums[m] < target:
                    l = m + 1
                else:
                    r = m
            return l

        def upper():
            l, r = 0, len(nums)
            while l < r:
                m = (l + r) // 2
                if nums[m] <= target:
                    l = m + 1
                else:
                    r = m
            return l

        left = lower()
        if left == len(nums) or nums[left] != target:
            return [-1, -1]
        return [left, upper() - 1]