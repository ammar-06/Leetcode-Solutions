function maxProduct(words: string[]): number {
    const n = words.length;
    const masks = new Array<number>(n);
    const lengths = new Array<number>(n);

    for (let i = 0; i < n; i++) {
        let mask = 0;
        for (const ch of words[i]) {
            mask |= 1 << (ch.charCodeAt(0) - 97);
        }
        masks[i] = mask;
        lengths[i] = words[i].length;
    }

    let ans = 0;
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if ((masks[i] & masks[j]) === 0) {
                ans = Math.max(ans, lengths[i] * lengths[j]);
            }
        }
    }

    return ans;
}