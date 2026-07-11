class Solution:
    def restoreIpAddresses(self, s: str) -> List[str]:
        res = []

        def backtrack(start, parts):
            if len(parts) == 4:
                if start == len(s):
                    res.append(".".join(parts))
                return

            for l in range(1, 4):
                if start + l > len(s):
                    break
                part = s[start:start + l]
                if (part[0] == '0' and l > 1) or int(part) > 255:
                    continue
                backtrack(start + l, parts + [part])

        backtrack(0, [])
        return res