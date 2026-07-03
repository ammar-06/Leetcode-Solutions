from typing import List
from collections import deque

class Solution:
    def findMaxPathScore(self, edges: List[List[int]], online: List[bool], k: int) -> int:
        n = len(online)
        adj = [[] for _ in range(n)]
        indeg = [0] * n
        costs = set()

        for u, v, w in edges:
            adj[u].append((v, w))
            indeg[v] += 1
            costs.add(w)

        q = deque(i for i in range(n) if indeg[i] == 0)
        topo = []
        while q:
            u = q.popleft()
            topo.append(u)
            for v, _ in adj[u]:
                indeg[v] -= 1
                if indeg[v] == 0:
                    q.append(v)

        INF = 10**30

        def check(x):
            dp = [INF] * n
            dp[0] = 0
            for u in topo:
                if dp[u] == INF:
                    continue
                if u != 0 and u != n - 1 and not online[u]:
                    continue
                for v, w in adj[u]:
                    if w < x:
                        continue
                    if v != 0 and v != n - 1 and not online[v]:
                        continue
                    nd = dp[u] + w
                    if nd < dp[v]:
                        dp[v] = nd
            return dp[n - 1] <= k

        vals = sorted(costs)
        if not vals:
            return -1

        lo, hi = 0, len(vals) - 1
        ans = -1
        while lo <= hi:
            mid = (lo + hi) // 2
            if check(vals[mid]):
                ans = vals[mid]
                lo = mid + 1
            else:
                hi = mid - 1
        return ans