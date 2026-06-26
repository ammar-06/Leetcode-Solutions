function selfDividingNumbers(left: number, right: number): number[] {
    const res: number[] = [];

    const isSelfDividing = (num: number): boolean => {
        let n = num;

        while (n > 0) {
            const d = n % 10;
            if (d === 0 || num % d !== 0) return false;
            n = Math.floor(n / 10);
        }

        return true;
    };

    for (let i = left; i <= right; i++) {
        if (isSelfDividing(i)) res.push(i);
    }

    return res;
}