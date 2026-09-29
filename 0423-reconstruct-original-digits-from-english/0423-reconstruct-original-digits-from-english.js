var originalDigits = function(s) {
    const count = new Array(26).fill(0);

    for (const ch of s) {
        count[ch.charCodeAt(0) - 97]++;
    }

    const digits = new Array(10).fill(0);

    digits[0] = count[25];
    digits[2] = count[22];
    digits[4] = count[20];
    digits[6] = count[23];
    digits[8] = count[6];

    digits[3] = count[7] - digits[8];
    digits[5] = count[5] - digits[4];
    digits[7] = count[18] - digits[6];
    digits[9] = count[8] - digits[5] - digits[6] - digits[8];
    digits[1] = count[14] - digits[0] - digits[2] - digits[4];

    let result = "";

    for (let i = 0; i <= 9; i++) {
        result += String(i).repeat(digits[i]);
    }

    return result;
};