class Solution:
    def numPermsDISequence(self, s: str) -> int:
        MOD = 10**9 + 7
        n = len(s)
        dp = [1] * (n + 1)

        for i, c in enumerate(s):
            ndp = [0] * (n + 1)
            if c == 'I':
                curr = 0
                for j in range(n - i):
                    curr = (curr + dp[j]) % MOD
                    ndp[j] = curr
            else:
                curr = 0
                for j in range(n - i - 1, -1, -1):
                    curr = (curr + dp[j + 1]) % MOD
                    ndp[j] = curr
            dp = ndp

        return dp[0]