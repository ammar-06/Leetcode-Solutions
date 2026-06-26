class Solution:
    def findTilt(self, root: Optional[TreeNode]) -> int:
        ans = 0

        def dfs(node):
            nonlocal ans
            if not node:
                return 0
            l = dfs(node.left)
            r = dfs(node.right)
            ans += abs(l - r)
            return l + r + node.val

        dfs(root)
        return ans