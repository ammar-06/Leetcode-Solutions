class Solution:
    def countCompleteComponents(self, n: int, edges: List[List[int]]) -> int:
        graph = [[] for _ in range(n)]
        for u, v in edges:
            graph[u].append(v)
            graph[v].append(u)

        visited = [False] * n
        ans = 0

        for i in range(n):
            if not visited[i]:
                stack = [i]
                visited[i] = True
                comp = []
                while stack:
                    u = stack.pop()
                    comp.append(u)
                    for v in graph[u]:
                        if not visited[v]:
                            visited[v] = True
                            stack.append(v)

                k = len(comp)
                edge_count = sum(len(graph[v]) for v in comp) // 2
                if edge_count == k * (k - 1) // 2:
                    ans += 1

        return ans