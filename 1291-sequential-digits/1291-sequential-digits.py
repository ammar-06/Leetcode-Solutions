class Solution:
    def sequentialDigits(self, low: int, high: int) -> List[int]:
        res = []
        s = "123456789"
        for l in range(len(str(low)), len(str(high)) + 1):
            for i in range(10 - l):
                num = int(s[i:i + l])
                if low <= num <= high:
                    res.append(num)
        return res
        

        