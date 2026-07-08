class Solution:
    def sumAndMultiply(self, n: int) -> int:
        x = 0
        s = 0
        for c in str(n):
            if c != '0':
                d = ord(c) - ord('0')
                x = x * 10 + d
                s += d
        return x * s