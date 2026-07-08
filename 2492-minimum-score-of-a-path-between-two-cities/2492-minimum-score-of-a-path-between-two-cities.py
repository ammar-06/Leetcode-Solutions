from typing import List
from collections import deque

class Solution:
    def minScore(self, n: int, roads: List[List[int]]) -> int:
        graph = [[] for _ in range(n + 1)]
        for a, b, d in roads:
            graph[a].append((b, d))
            graph[b].append((a, d))

        visited = [False] * (n + 1)
        q = deque([1])
        visited[1] = True
        ans = float('inf')

        while q:
            u = q.popleft()
            for v, d in graph[u]:
                ans = min(ans, d)
                if not visited[v]:
                    visited[v] = True
                    q.append(v)

        return ans