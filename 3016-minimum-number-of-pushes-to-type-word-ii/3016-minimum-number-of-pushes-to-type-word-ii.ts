function minimumPushes(word: string): number {
    const freq = new Array(26).fill(0);

    for (const ch of word) {
        freq[ch.charCodeAt(0) - 97]++;
    }

    freq.sort((a, b) => b - a);

    let ans = 0;
    for (let i = 0; i < 26 && freq[i] > 0; i++) {
        ans += freq[i] * (Math.floor(i / 8) + 1);
    }

    return ans;
}