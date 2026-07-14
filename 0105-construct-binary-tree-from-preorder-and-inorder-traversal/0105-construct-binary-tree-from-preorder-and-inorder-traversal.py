from typing import List, Optional

# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Solution:
    def buildTree(self, preorder: List[int], inorder: List[int]) -> Optional[TreeNode]:
        pos = {v: i for i, v in enumerate(inorder)}
        pre = 0

        def dfs(l, r):
            nonlocal pre
            if l > r:
                return None
            val = preorder[pre]
            pre += 1
            root = TreeNode(val)
            mid = pos[val]
            root.left = dfs(l, mid - 1)
            root.right = dfs(mid + 1, r)
            return root

        return dfs(0, len(inorder) - 1)