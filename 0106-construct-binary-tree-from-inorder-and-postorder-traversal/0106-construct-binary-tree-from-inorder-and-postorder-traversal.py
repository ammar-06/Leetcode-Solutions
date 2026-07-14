from typing import List, Optional

# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Solution:
    def buildTree(self, inorder: List[int], postorder: List[int]) -> Optional[TreeNode]:
        pos = {v: i for i, v in enumerate(inorder)}
        idx = len(postorder) - 1

        def dfs(l, r):
            nonlocal idx
            if l > r:
                return None
            val = postorder[idx]
            idx -= 1
            root = TreeNode(val)
            mid = pos[val]
            root.right = dfs(mid + 1, r)
            root.left = dfs(l, mid - 1)
            return root

        return dfs(0, len(inorder) - 1)