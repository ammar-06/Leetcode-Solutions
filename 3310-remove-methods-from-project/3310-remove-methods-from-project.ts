function remainingMethods(n: number, k: number, invocations: number[][]): number[] {
    const graph: number[][] = Array.from({ length: n }, () => []);
    for (const [u, v] of invocations) {
        graph[u].push(v);
    }

    const suspicious = new Array<boolean>(n).fill(false);
    const stack = [k];
    suspicious[k] = true;

    while (stack.length) {
        const u = stack.pop()!;
        for (const v of graph[u]) {
            if (!suspicious[v]) {
                suspicious[v] = true;
                stack.push(v);
            }
        }
    }

    for (const [u, v] of invocations) {
        if (!suspicious[u] && suspicious[v]) {
            const res: number[] = [];
            for (let i = 0; i < n; i++) res.push(i);
            return res;
        }
    }

    const res: number[] = [];
    for (let i = 0; i < n; i++) {
        if (!suspicious[i]) res.push(i);
    }
    return res;
}