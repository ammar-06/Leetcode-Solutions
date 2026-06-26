function validPalindrome(s: string): boolean {
    const isPal = (l: number, r: number): boolean => {
        while (l < r) {
            if (s[l] !== s[r]) return false;
            l++;
            r--;
        }
        return true;
    };

    let l = 0, r = s.length - 1;

    while (l < r) {
        if (s[l] === s[r]) {
            l++;
            r--;
        } else {
            return isPal(l + 1, r) || isPal(l, r - 1);
        }
    }

    return true;
}