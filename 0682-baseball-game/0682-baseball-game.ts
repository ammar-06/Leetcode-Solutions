function calPoints(operations: string[]): number {
    const stack: number[] = [];

    for (const op of operations) {
        if (op === "C") {
            stack.pop();
        } else if (op === "D") {
            stack.push(stack[stack.length - 1] * 2);
        } else if (op === "+") {
            const a = stack[stack.length - 1];
            const b = stack[stack.length - 2];
            stack.push(a + b);
        } else {
            stack.push(Number(op));
        }
    }

    let sum = 0;
    for (const v of stack) sum += v;

    return sum;
}