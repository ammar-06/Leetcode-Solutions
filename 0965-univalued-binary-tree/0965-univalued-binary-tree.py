class Solution:
    def isUnivalTree(self, root: Optional[TreeNode]) -> bool:
        val = root.val

        def dfs(node):
            if not node:
                return True
            return node.val == val and dfs(node.left) and dfs(node.right)

        return dfs(root)