class Solution:
    def singleNumber(self, nums: List[int]) -> List[int]:
        x = 0
        for num in nums:
            x ^= num

        diff = x & -x
        a = b = 0

        for num in nums:
            if num & diff:
                a ^= num
            else:
                b ^= num

        return [a, b]