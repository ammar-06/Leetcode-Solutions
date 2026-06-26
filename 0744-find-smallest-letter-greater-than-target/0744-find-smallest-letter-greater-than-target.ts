function nextGreatestLetter(letters: string[], target: string): string {
    let l = 0, r = letters.length - 1;

    while (l <= r) {
        const m = l + ((r - l) >> 1);

        if (letters[m] <= target) l = m + 1;
        else r = m - 1;
    }

    return letters[l % letters.length];
}