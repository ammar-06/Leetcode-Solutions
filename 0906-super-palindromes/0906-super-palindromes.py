class Solution:
    def superpalindromesInRange(self, left: str, right: str) -> int:
        L, R = int(left), int(right)

        def is_pal(x):
            s = str(x)
            return s == s[::-1]

        ans = 0
        LIMIT = 100000

        for k in range(1, LIMIT):
            s = str(k)
            v = int(s + s[-2::-1])
            sq = v * v
            if sq > R:
                break
            if sq >= L and is_pal(sq):
                ans += 1

        for k in range(1, LIMIT):
            s = str(k)
            v = int(s + s[::-1])
            sq = v * v
            if sq > R:
                break
            if sq >= L and is_pal(sq):
                ans += 1

        return ans