function findMinHeightTrees(n: number, edges: number[][]): number[] {
    if (n === 1) return [0];

    const graph: number[][] = Array.from({ length: n }, () => []);
    const degree = new Array(n).fill(0);

    for (const [u, v] of edges) {
        graph[u].push(v);
        graph[v].push(u);
        degree[u]++;
        degree[v]++;
    }

    let leaves: number[] = [];
    for (let i = 0; i < n; i++) {
        if (degree[i] === 1) leaves.push(i);
    }

    let remaining = n;

    while (remaining > 2) {
        remaining -= leaves.length;
        const newLeaves: number[] = [];

        for (const leaf of leaves) {
            for (const neighbor of graph[leaf]) {
                degree[neighbor]--;
                if (degree[neighbor] === 1) {
                    newLeaves.push(neighbor);
                }
            }
        }

        leaves = newLeaves;
    }

    return leaves;
}