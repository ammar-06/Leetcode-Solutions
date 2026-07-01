class Solution:
    def numRookCaptures(self, board: List[List[str]]) -> int:
        for i in range(8):
            for j in range(8):
                if board[i][j] == 'R':
                    r, c = i, j
                    break
            else:
                continue
            break
        
        ans = 0
        for dr, dc in [(-1,0), (1,0), (0,-1), (0,1)]:
            x, y = r + dr, c + dc
            while 0 <= x < 8 and 0 <= y < 8:
                if board[x][y] == 'B':
                    break
                if board[x][y] == 'p':
                    ans += 1
                    break
                x += dr
                y += dc
        
        return ans