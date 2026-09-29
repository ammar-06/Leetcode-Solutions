var pacificAtlantic = function(heights) {
    const m = heights.length;
    const n = heights[0].length;

    const pacific = Array.from({ length: m }, () => Array(n).fill(false));
    const atlantic = Array.from({ length: m }, () => Array(n).fill(false));

    const dfs = (r, c, ocean) => {
        if (r < 0 || r >= m || c < 0 || c >= n || ocean[r][c]) return;

        ocean[r][c] = true;

        if (r > 0 && heights[r - 1][c] >= heights[r][c])
            dfs(r - 1, c, ocean);

        if (r < m - 1 && heights[r + 1][c] >= heights[r][c])
            dfs(r + 1, c, ocean);

        if (c > 0 && heights[r][c - 1] >= heights[r][c])
            dfs(r, c - 1, ocean);

        if (c < n - 1 && heights[r][c + 1] >= heights[r][c])
            dfs(r, c + 1, ocean);
    };

    for (let r = 0; r < m; r++) {
        dfs(r, 0, pacific);
        dfs(r, n - 1, atlantic);
    }

    for (let c = 0; c < n; c++) {
        dfs(0, c, pacific);
        dfs(m - 1, c, atlantic);
    }

    const result = [];

    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            if (pacific[r][c] && atlantic[r][c]) {
                result.push([r, c]);
            }
        }
    }

    return result;
};