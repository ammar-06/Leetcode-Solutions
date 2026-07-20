class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> bool:
        wordSet = set(wordDict)
        maxLen = max(map(len, wordDict))
        dp = [True] + [False] * len(s)

        for i in range(1, len(s) + 1):
            for l in range(1, min(maxLen, i) + 1):
                if dp[i - l] and s[i - l:i] in wordSet:
                    dp[i] = True
                    break

        return dp[-1]