var findRightInterval = function(intervals) {
    const n = intervals.length;
    const starts = intervals.map((interval, i) => [interval[0], i]);

    starts.sort((a, b) => a[0] - b[0]);

    const result = new Array(n).fill(-1);

    for (let i = 0; i < n; i++) {
        const end = intervals[i][1];

        let left = 0;
        let right = n - 1;
        let index = -1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);

            if (starts[mid][0] >= end) {
                index = starts[mid][1];
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }

        result[i] = index;
    }

    return result;
};