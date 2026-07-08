from bisect import bisect_left, bisect_right
from typing import List

class Solution:
    def sumAndMultiply(self, s: str, queries: List[List[int]]) -> List[int]:
        MOD = 10**9 + 7

        pos = []
        dig = []
        pref = [0]
        pw = [1]

        for i, ch in enumerate(s):
            d = ord(ch) - 48
            if d:
                pos.append(i)
                dig.append(d)
                pref.append((pref[-1] * 10 + d) % MOD)
                pw.append((pw[-1] * 10) % MOD)

        ps = [0]
        for d in dig:
            ps.append(ps[-1] + d)

        ans = []
        for l, r in queries:
            a = bisect_left(pos, l)
            b = bisect_right(pos, r)
            if a == b:
                ans.append(0)
                continue
            k = b - a
            x = (pref[b] - pref[a] * pw[k]) % MOD
            sm = ps[b] - ps[a]
            ans.append((x * sm) % MOD)

        return ans