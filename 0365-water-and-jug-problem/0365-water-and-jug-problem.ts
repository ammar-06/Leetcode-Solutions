function canMeasureWater(x: number, y: number, target: number): boolean {
    if (target > x + y) return false;
    if (target === x || target === y || target === x + y) return true;

    const gcd = (a: number, b: number): number => {
        while (b !== 0) {
            const t = a % b;
            a = b;
            b = t;
        }
        return a;
    };

    return target % gcd(x, y) === 0;
}