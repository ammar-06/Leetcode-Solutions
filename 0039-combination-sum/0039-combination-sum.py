from typing import List

class Solution:
    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        res = []

        def dfs(start, remain, path):
            if remain == 0:
                res.append(path[:])
                return
            for i in range(start, len(candidates)):
                if candidates[i] > remain:
                    continue
                path.append(candidates[i])
                dfs(i, remain - candidates[i], path)
                path.pop()

        dfs(0, target, [])
        return res