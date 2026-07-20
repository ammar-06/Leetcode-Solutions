class Solution:
    def cloneGraph(self, node: 'Node') -> 'Node':
        if not node:
            return None
        
        mp = {}

        def dfs(cur):
            if cur in mp:
                return mp[cur]
            
            copy = Node(cur.val)
            mp[cur] = copy
            
            for nei in cur.neighbors:
                copy.neighbors.append(dfs(nei))
            
            return copy
        
        return dfs(node)