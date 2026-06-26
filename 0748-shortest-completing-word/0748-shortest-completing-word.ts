function shortestCompletingWord(licensePlate: string, words: string[]): string {
    const need = new Array(26).fill(0);

    const a = "a".charCodeAt(0);

    for (let c of licensePlate.toLowerCase()) {
        const code = c.charCodeAt(0);
        if (code >= 97 && code <= 122) {
            need[code - a]++;
        }
    }

    const can = (word: string): boolean => {
        const freq = new Array(26).fill(0);

        for (let c of word) {
            freq[c.charCodeAt(0) - a]++;
        }

        for (let i = 0; i < 26; i++) {
            if (freq[i] < need[i]) return false;
        }

        return true;
    };

    let res = "";

    for (const w of words) {
        if (can(w)) {
            if (res === "" || w.length < res.length) {
                res = w;
            }
        }
    }

    return res;
}