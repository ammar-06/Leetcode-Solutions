from typing import List

class Solution:
    def pathsWithMaxScore(self, board: List[str]) -> List[int]:
        MOD = 10**9 + 7
        n = len(board)

        dp = [[-1] * n for _ in range(n)]
        cnt = [[0] * n for _ in range(n)]

        dp[n - 1][n - 1] = 0
        cnt[n - 1][n - 1] = 1

        for i in range(n - 1, -1, -1):
            for j in range(n - 1, -1, -1):
                if board[i][j] == 'X' or (i == n - 1 and j == n - 1):
                    continue

                best = -1
                ways = 0

                for ni, nj in ((i + 1, j), (i, j + 1), (i + 1, j + 1)):
                    if ni < n and nj < n and dp[ni][nj] != -1:
                        if dp[ni][nj] > best:
                            best = dp[ni][nj]
                            ways = cnt[ni][nj]
                        elif dp[ni][nj] == best:
                            ways = (ways + cnt[ni][nj]) % MOD

                if best == -1:
                    continue

                val = 0
                if board[i][j].isdigit():
                    val = int(board[i][j])

                dp[i][j] = best + val
                cnt[i][j] = ways

        if dp[0][0] == -1:
            return [0, 0]
        return [dp[0][0], cnt[0][0]]