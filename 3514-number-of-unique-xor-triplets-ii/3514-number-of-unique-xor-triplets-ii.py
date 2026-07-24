class Solution:
    def uniqueXorTriplets(self, nums: List[int]) -> int:
        n = len(nums)
        if n < 3:
            return len(set(nums))

        MAXX = 2048
        seen = [False] * MAXX

        for a in nums:
            for b in nums:
                seen[a ^ b] = True

        ans = [False] * MAXX
        for x in range(MAXX):
            if seen[x]:
                for v in nums:
                    ans[x ^ v] = True

        return sum(ans)