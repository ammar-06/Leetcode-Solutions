from collections import Counter

class Solution:
    def smallestPalindrome(self, s: str, k: int) -> str:
        freq = Counter(s)
        half = {}
        mid = ""
        m = 0

        for c in sorted(freq):
            half[c] = freq[c] // 2
            m += half[c]
            if freq[c] & 1:
                mid = c

        def comb_cap(n, r, cap):
            if r < 0 or r > n:
                return 0
            r = min(r, n - r)
            res = 1
            for i in range(1, r + 1):
                res = res * (n - r + i) // i
                if res >= cap:
                    return cap
            return res

        def count(cnt):
            rem = sum(cnt.values())
            ans = 1
            for ch in sorted(cnt):
                x = cnt[ch]
                if x:
                    ans *= comb_cap(rem, x, k)
                    if ans >= k:
                        return k
                    rem -= x
            return ans

        if count(half) < k:
            return ""

        left = []
        for _ in range(m):
            for ch in sorted(half):
                if half[ch] == 0:
                    continue
                half[ch] -= 1
                ways = count(half)
                if ways >= k:
                    left.append(ch)
                    break
                k -= ways
                half[ch] += 1

        left = "".join(left)
        return left + mid + left[::-1]