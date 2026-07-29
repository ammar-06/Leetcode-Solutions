class Solution:
    def isAdditiveNumber(self, num: str) -> bool:
        n = len(num)

        def valid(i, j):
            a = num[:i]
            b = num[i:j]
            if (len(a) > 1 and a[0] == '0') or (len(b) > 1 and b[0] == '0'):
                return False

            x, y = int(a), int(b)
            k = j

            while k < n:
                s = str(x + y)
                if not num.startswith(s, k):
                    return False
                k += len(s)
                x, y = y, x + y

            return True

        for i in range(1, n - 1):
            for j in range(i + 1, n):
                if valid(i, j):
                    return True

        return False