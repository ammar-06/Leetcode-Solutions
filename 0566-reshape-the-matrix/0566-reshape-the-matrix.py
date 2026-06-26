class Solution:
    def matrixReshape(self, mat: List[List[int]], r: int, c: int) -> List[List[int]]:
        m, n = len(mat), len(mat[0])
        if m * n != r * c:
            return mat
        a = [x for row in mat for x in row]
        return [a[i:i + c] for i in range(0, len(a), c)]