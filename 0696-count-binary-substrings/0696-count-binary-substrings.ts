function countBinarySubstrings(s: string): number {
    let prev = 0;
    let curr = 1;
    let res = 0;

    for (let i = 1; i < s.length; i++) {
        if (s[i] === s[i - 1]) {
            curr++;
        } else {
            res += Math.min(prev, curr);
            prev = curr;
            curr = 1;
        }
    }

    res += Math.min(prev, curr);

    return res;
}