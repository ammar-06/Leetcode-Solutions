function removeDuplicateLetters(s: string): string {
    const last = new Array<number>(26).fill(0);
    for (let i = 0; i < s.length; i++) {
        last[s.charCodeAt(i) - 97] = i;
    }

    const stack: string[] = [];
    const seen = new Array<boolean>(26).fill(false);

    for (let i = 0; i < s.length; i++) {
        const c = s[i];
        const idx = c.charCodeAt(0) - 97;

        if (seen[idx]) continue;

        while (
            stack.length &&
            stack[stack.length - 1] > c &&
            last[stack[stack.length - 1].charCodeAt(0) - 97] > i
        ) {
            seen[stack.pop()!.charCodeAt(0) - 97] = false;
        }

        stack.push(c);
        seen[idx] = true;
    }

    return stack.join("");
}