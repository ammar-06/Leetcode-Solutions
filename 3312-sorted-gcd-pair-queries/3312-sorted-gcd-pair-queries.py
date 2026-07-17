from typing import List

class Solution:
    def gcdValues(self, nums: List[int], queries: List[int]) -> List[int]:
        m = max(nums)
        freq = [0] * (m + 1)
        for x in nums:
            freq[x] += 1

        cnt = [0] * (m + 1)
        for d in range(1, m + 1):
            s = 0
            for k in range(d, m + 1, d):
                s += freq[k]
            cnt[d] = s

        exact = [0] * (m + 1)
        for d in range(m, 0, -1):
            c = cnt[d]
            pairs = c * (c - 1) // 2
            for k in range(d * 2, m + 1, d):
                pairs -= exact[k]
            exact[d] = pairs

        prefix = [0] * (m + 1)
        for d in range(1, m + 1):
            prefix[d] = prefix[d - 1] + exact[d]

        ans = []
        for q in queries:
            target = q + 1
            l, r = 1, m
            while l < r:
                mid = (l + r) // 2
                if prefix[mid] >= target:
                    r = mid
                else:
                    l = mid + 1
            ans.append(l)
        return ans