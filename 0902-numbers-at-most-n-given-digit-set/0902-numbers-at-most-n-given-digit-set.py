class Solution:
    def atMostNGivenDigitSet(self, digits: List[str], n: int) -> int:
        s = str(n)
        m, k = len(s), len(digits)
        
        ans = sum(k ** i for i in range(1, m))
        
        for i, ch in enumerate(s):
            smaller = 0
            for d in digits:
                if d < ch:
                    smaller += 1
                else:
                    break
            ans += smaller * (k ** (m - i - 1))
            if ch not in digits:
                return ans
        
        return ans + 1