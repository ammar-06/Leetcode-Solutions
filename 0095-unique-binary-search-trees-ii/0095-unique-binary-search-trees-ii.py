from typing import List, Optional

# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Solution:
    def generateTrees(self, n: int) -> List[Optional[TreeNode]]:
        from functools import lru_cache

        @lru_cache(None)
        def build(l, r):
            if l > r:
                return [None]
            res = []
            for i in range(l, r + 1):
                for left in build(l, i - 1):
                    for right in build(i + 1, r):
                        res.append(TreeNode(i, left, right))
            return res

        return build(1, n)