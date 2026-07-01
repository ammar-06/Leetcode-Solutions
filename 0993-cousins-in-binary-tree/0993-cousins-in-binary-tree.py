class Solution:
    def isCousins(self, root: Optional[TreeNode], x: int, y: int) -> bool:
        from collections import deque
        
        q = deque([(root, None)])
        
        while q:
            px = py = None
            for _ in range(len(q)):
                node, parent = q.popleft()
                if node.val == x:
                    px = parent
                if node.val == y:
                    py = parent
                if node.left:
                    q.append((node.left, node))
                if node.right:
                    q.append((node.right, node))
            if px or py:
                return px is not None and py is not None and px != py
        
        return False 