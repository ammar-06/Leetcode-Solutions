from collections import deque

class Solution:
    def catMouseGame(self, graph):
        n = len(graph)
        DRAW, MOUSE, CAT = 0, 1, 2

        color = [[[DRAW] * 2 for _ in range(n)] for _ in range(n)]
        degree = [[[0] * 2 for _ in range(n)] for _ in range(n)]

        for m in range(n):
            for c in range(n):
                degree[m][c][0] = len(graph[m])
                degree[m][c][1] = len(graph[c]) - (0 in graph[c])

        q = deque()

        for c in range(n):
            for t in range(2):
                color[0][c][t] = MOUSE
                q.append((0, c, t, MOUSE))

        for i in range(1, n):
            for t in range(2):
                color[i][i][t] = CAT
                q.append((i, i, t, CAT))

        while q:
            m, c, turn, result = q.popleft()

            if turn == 0:
                parents = []
                for pc in graph[c]:
                    if pc != 0:
                        parents.append((m, pc, 1))
            else:
                parents = [(pm, c, 0) for pm in graph[m]]

            for pm, pc, pturn in parents:
                if color[pm][pc][pturn] != DRAW:
                    continue
                if (pturn == 0 and result == MOUSE) or (pturn == 1 and result == CAT):
                    color[pm][pc][pturn] = result
                    q.append((pm, pc, pturn, result))
                else:
                    degree[pm][pc][pturn] -= 1
                    if degree[pm][pc][pturn] == 0:
                        lose = CAT if pturn == 0 else MOUSE
                        color[pm][pc][pturn] = lose
                        q.append((pm, pc, pturn, lose))

        return color[1][2][0]