var maxNumOfSubstrings = function(s) {
    const n = s.length;
    const first = new Array(26).fill(-1);
    const last = new Array(26).fill(-1);
    
    for (let i = 0; i < n; i++) {
        const c = s.charCodeAt(i) - 97;
        if (first[c] === -1) first[c] = i;
        last[c] = i;
    }
    
    const intervals = [];
    
    for (let i = 0; i < n; i++) {
        const c = s.charCodeAt(i) - 97;
        if (first[c] !== i) continue; // only start intervals at first occurrence
        
        let start = i;
        let end = last[c];
        let valid = true;
        let j = start;
        
        while (j <= end) {
            const cj = s.charCodeAt(j) - 97;
            if (first[cj] < start) {
                valid = false;
                break;
            }
            if (last[cj] > end) {
                end = last[cj];
            }
            j++;
        }
        
        if (valid) {
            intervals.push([start, end]);
        }
    }
    
    // sort by end position to prefer smaller/earlier-ending intervals
    intervals.sort((a, b) => a[1] - b[1]);
    
    const result = [];
    let prevEnd = -1;
    
    for (const [start, end] of intervals) {
        if (start > prevEnd) {
            result.push(s.substring(start, end + 1));
            prevEnd = end;
        }
    }
    
    return result;
};