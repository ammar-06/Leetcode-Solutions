function minCostClimbingStairs(cost: number[]): number {
    const n = cost.length;
    let a = 0, b = 0;

    for (let i = 2; i <= n; i++) {
        const curr = Math.min(b + cost[i - 1], a + cost[i - 2]);
        a = b;
        b = curr;
    }

    return b;
}