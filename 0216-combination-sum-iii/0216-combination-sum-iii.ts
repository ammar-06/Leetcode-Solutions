function combinationSum3(k: number, n: number): number[][] {
    const res: number[][] = [];
    const path: number[] = [];

    function backtrack(start: number, sum: number): void {
        if (path.length === k) {
            if (sum === n) res.push([...path]);
            return;
        }

        for (let i = start; i <= 9; i++) {
            if (sum + i > n) break;
            path.push(i);
            backtrack(i + 1, sum + i);
            path.pop();
        }
    }

    backtrack(1, 0);
    return res;
}