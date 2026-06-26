function toLowerCase(s: string): string {
    let res = "";

    for (let i = 0; i < s.length; i++) {
        const code = s.charCodeAt(i);

        if (code >= 65 && code <= 90) {
            res += String.fromCharCode(code + 32);
        } else {
            res += s[i];
        }
    }

    return res;
}