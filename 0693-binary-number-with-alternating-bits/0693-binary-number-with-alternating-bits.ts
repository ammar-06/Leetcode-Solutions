function hasAlternatingBits(n: number): boolean {
    let prev = n & 1;
    n >>= 1;

    while (n > 0) {
        const curr = n & 1;
        if (curr === prev) return false;
        prev = curr;
        n >>= 1;
    }

    return true;
}