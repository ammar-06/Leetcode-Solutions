var construct = function(grid) {
    class Node {
        constructor(val, isLeaf, topLeft = null, topRight = null, bottomLeft = null, bottomRight = null) {
            this.val = val;
            this.isLeaf = isLeaf;
            this.topLeft = topLeft;
            this.topRight = topRight;
            this.bottomLeft = bottomLeft;
            this.bottomRight = bottomRight;
        }
    }

    const build = (r, c, size) => {
        let same = true;
        const value = grid[r][c];

        for (let i = r; i < r + size && same; i++) {
            for (let j = c; j < c + size; j++) {
                if (grid[i][j] !== value) {
                    same = false;
                    break;
                }
            }
        }

        if (same) {
            return new Node(value === 1, true);
        }

        const half = size / 2;

        return new Node(
            true,
            false,
            build(r, c, half),
            build(r, c + half, half),
            build(r + half, c, half),
            build(r + half, c + half, half)
        );
    };

    return build(0, 0, grid.length);
};