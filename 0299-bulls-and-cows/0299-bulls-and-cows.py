from collections import Counter

class Solution:
    def getHint(self, secret: str, guess: str) -> str:
        bulls = 0
        s = Counter()
        g = Counter()

        for a, b in zip(secret, guess):
            if a == b:
                bulls += 1
            else:
                s[a] += 1
                g[b] += 1

        cows = sum(min(s[c], g[c]) for c in s)
        return f"{bulls}A{cows}B"