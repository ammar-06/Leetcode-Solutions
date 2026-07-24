class Solution:
    def findRepeatedDnaSequences(self, s: str) -> List[str]:
        seen = set()
        ans = set()

        for i in range(len(s) - 9):
            sub = s[i:i + 10]
            if sub in seen:
                ans.add(sub)
            else:
                seen.add(sub)

        return list(ans)