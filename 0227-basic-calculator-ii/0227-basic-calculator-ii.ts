function calculate(s: string): number {
    const stack: number[] = [];
    let num = 0;
    let sign = '+';

    for (let i = 0; i <= s.length; i++) {
        const c = i < s.length ? s[i] : '+';

        if (c >= '0' && c <= '9') {
            num = num * 10 + (c.charCodeAt(0) - 48);
        }

        if ((c < '0' || c > '9') && c !== ' ') {
            if (sign === '+') {
                stack.push(num);
            } else if (sign === '-') {
                stack.push(-num);
            } else if (sign === '*') {
                stack.push(stack.pop()! * num);
            } else {
                stack.push(Math.trunc(stack.pop()! / num));
            }

            sign = c;
            num = 0;
        }
    }

    return stack.reduce((sum, val) => sum + val, 0);
}