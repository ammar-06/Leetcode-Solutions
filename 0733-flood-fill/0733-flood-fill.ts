function floodFill(image: number[][], sr: number, sc: number, color: number): number[][] {
    const original = image[sr][sc];
    if (original === color) return image;

    const m = image.length;
    const n = image[0].length;

    const dfs = (r: number, c: number): void => {
        if (r < 0 || c < 0 || r >= m || c >= n) return;
        if (image[r][c] !== original) return;

        image[r][c] = color;

        dfs(r + 1, c);
        dfs(r - 1, c);
        dfs(r, c + 1);
        dfs(r, c - 1);
    };

    dfs(sr, sc);
    return image;
}