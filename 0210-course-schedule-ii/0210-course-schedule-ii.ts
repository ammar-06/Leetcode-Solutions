function findOrder(numCourses: number, prerequisites: number[][]): number[] {
    const graph: number[][] = Array.from({ length: numCourses }, () => []);
    const indegree: number[] = new Array(numCourses).fill(0);

    for (const [a, b] of prerequisites) {
        graph[b].push(a);
        indegree[a]++;
    }

    const queue: number[] = [];
    for (let i = 0; i < numCourses; i++) {
        if (indegree[i] === 0) queue.push(i);
    }

    const order: number[] = [];
    let head = 0;

    while (head < queue.length) {
        const node = queue[head++];
        order.push(node);

        for (const next of graph[node]) {
            indegree[next]--;
            if (indegree[next] === 0) {
                queue.push(next);
            }
        }
    }

    return order.length === numCourses ? order : [];
}