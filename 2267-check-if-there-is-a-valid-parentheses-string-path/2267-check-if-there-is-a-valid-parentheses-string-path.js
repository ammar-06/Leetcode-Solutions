var hasValidPath = function(grid) {
    const m = grid.length;
    const n = grid[0].length;
    
    if ((m + n - 1) % 2 !== 0) return false;
    if (grid[0][0] === ')' || grid[m - 1][n - 1] === '(') return false;
    
    const maxBal = m + n;
    const visited = new Set();
    
    const dfs = (i, j, bal) => {
        if (bal < 0 || bal > maxBal) return false;
        if (i >= m || j >= n) return false;
        
        bal += grid[i][j] === '(' ? 1 : -1;
        if (bal < 0) return false;
        
        if (i === m - 1 && j === n - 1) return bal === 0;
        
        const key = i * n * maxBal + j * maxBal + bal;
        if (visited.has(key)) return false;
        visited.add(key);
        
        return dfs(i + 1, j, bal) || dfs(i, j + 1, bal);
    };
    
    return dfs(0, 0, 0);
};