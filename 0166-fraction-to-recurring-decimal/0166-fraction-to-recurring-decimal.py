class Solution:
    def fractionToDecimal(self, numerator: int, denominator: int) -> str:
        if numerator == 0:
            return "0"

        res = []

        if (numerator < 0) ^ (denominator < 0):
            res.append("-")

        numerator, denominator = abs(numerator), abs(denominator)

        res.append(str(numerator // denominator))
        rem = numerator % denominator

        if rem == 0:
            return "".join(res)

        res.append(".")
        pos = {}

        while rem:
            if rem in pos:
                idx = pos[rem]
                res.insert(idx, "(")
                res.append(")")
                break

            pos[rem] = len(res)
            rem *= 10
            res.append(str(rem // denominator))
            rem %= denominator

        return "".join(res)