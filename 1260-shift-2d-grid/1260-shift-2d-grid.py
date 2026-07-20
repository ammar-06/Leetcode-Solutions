class Solution:
    def shiftGrid(self, grid, k):
        m, n = len(grid), len(grid[0])
        total = m * n
        k %= total

        arr = []
        for row in grid:
            arr.extend(row)

        if k:
            arr = arr[-k:] + arr[:-k]

        return [arr[i * n:(i + 1) * n] for i in range(m)]