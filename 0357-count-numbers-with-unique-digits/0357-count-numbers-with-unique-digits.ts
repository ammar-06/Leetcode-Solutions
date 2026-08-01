function countNumbersWithUniqueDigits(n: number): number {
    if (n === 0) return 1;

    let ans = 10;
    let unique = 9;
    let available = 9;

    for (let i = 2; i <= n && available > 0; i++) {
        unique *= available;
        ans += unique;
        available--;
    }

    return ans;
}