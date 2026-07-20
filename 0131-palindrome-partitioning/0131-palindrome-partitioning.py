class Solution:
    def partition(self, s):
        res = []
        path = []

        def dfs(start):
            if start == len(s):
                res.append(path[:])
                return
            for end in range(start, len(s)):
                sub = s[start:end + 1]
                if sub == sub[::-1]:
                    path.append(sub)
                    dfs(end + 1)
                    path.pop()

        dfs(0)
        return res