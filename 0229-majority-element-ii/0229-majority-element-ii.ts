function majorityElement(nums: number[]): number[] {
    let cand1 = 0, cand2 = 0;
    let count1 = 0, count2 = 0;

    for (const num of nums) {
        if (num === cand1) {
            count1++;
        } else if (num === cand2) {
            count2++;
        } else if (count1 === 0) {
            cand1 = num;
            count1 = 1;
        } else if (count2 === 0) {
            cand2 = num;
            count2 = 1;
        } else {
            count1--;
            count2--;
        }
    }

    count1 = 0;
    count2 = 0;

    for (const num of nums) {
        if (num === cand1) count1++;
        else if (num === cand2) count2++;
    }

    const res: number[] = [];
    const limit = Math.floor(nums.length / 3);

    if (count1 > limit) res.push(cand1);
    if (count2 > limit) res.push(cand2);

    return res;
}