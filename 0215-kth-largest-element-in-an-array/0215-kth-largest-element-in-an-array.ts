function findKthLargest(nums: number[], k: number): number {
    const heap: number[] = [];

    const siftUp = (i: number) => {
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (heap[p] <= heap[i]) break;
            [heap[p], heap[i]] = [heap[i], heap[p]];
            i = p;
        }
    };

    const siftDown = (i: number) => {
        const n = heap.length;
        while (true) {
            let smallest = i;
            const l = i * 2 + 1;
            const r = i * 2 + 2;

            if (l < n && heap[l] < heap[smallest]) smallest = l;
            if (r < n && heap[r] < heap[smallest]) smallest = r;

            if (smallest === i) break;
            [heap[i], heap[smallest]] = [heap[smallest], heap[i]];
            i = smallest;
        }
    };

    for (const num of nums) {
        if (heap.length < k) {
            heap.push(num);
            siftUp(heap.length - 1);
        } else if (num > heap[0]) {
            heap[0] = num;
            siftDown(0);
        }
    }

    return heap[0];
}