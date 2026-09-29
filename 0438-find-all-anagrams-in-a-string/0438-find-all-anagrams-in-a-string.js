var findAnagrams = function(s, p) {
    const need = new Array(26).fill(0);
    const window = new Array(26).fill(0);

    for (const ch of p) {
        need[ch.charCodeAt(0) - 97]++;
    }

    const result = [];
    let left = 0;

    for (let right = 0; right < s.length; right++) {
        window[s.charCodeAt(right) - 97]++;

        if (right - left + 1 > p.length) {
            window[s.charCodeAt(left) - 97]--;
            left++;
        }

        if (right - left + 1 === p.length) {
            let match = true;

            for (let i = 0; i < 26; i++) {
                if (need[i] !== window[i]) {
                    match = false;
                    break;
                }
            }

            if (match) result.push(left);
        }
    }

    return result;
};