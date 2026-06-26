function imageSmoother(img: number[][]): number[][] {
    const m = img.length;
    const n = img[0].length;
    const res: number[][] = Array.from({ length: m }, () => Array(n).fill(0));

    const dirs = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],  [0, 0],  [0, 1],
        [1, -1],  [1, 0],  [1, 1]
    ];

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            let sum = 0;
            let count = 0;

            for (const [dx, dy] of dirs) {
                const x = i + dx;
                const y = j + dy;

                if (x >= 0 && x < m && y >= 0 && y < n) {
                    sum += img[x][y];
                    count++;
                }
            }

            res[i][j] = Math.floor(sum / count);
        }
    }

    return res;
}