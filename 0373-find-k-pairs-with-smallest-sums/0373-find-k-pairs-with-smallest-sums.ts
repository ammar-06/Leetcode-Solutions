function kSmallestPairs(nums1: number[], nums2: number[], k: number): number[][] {
    const res: number[][] = [];
    if (nums1.length === 0 || nums2.length === 0 || k === 0) return res;

    class MinHeap {
        heap: [number, number, number][] = [];

        push(node: [number, number, number]) {
            this.heap.push(node);
            let i = this.heap.length - 1;
            while (i > 0) {
                const p = (i - 1) >> 1;
                if (this.heap[p][0] <= this.heap[i][0]) break;
                [this.heap[p], this.heap[i]] = [this.heap[i], this.heap[p]];
                i = p;
            }
        }

        pop(): [number, number, number] {
            const top = this.heap[0];
            const last = this.heap.pop()!;
            if (this.heap.length) {
                this.heap[0] = last;
                let i = 0;
                while (true) {
                    let smallest = i;
                    const l = i * 2 + 1;
                    const r = i * 2 + 2;
                    if (l < this.heap.length && this.heap[l][0] < this.heap[smallest][0]) smallest = l;
                    if (r < this.heap.length && this.heap[r][0] < this.heap[smallest][0]) smallest = r;
                    if (smallest === i) break;
                    [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
                    i = smallest;
                }
            }
            return top;
        }

        size(): number {
            return this.heap.length;
        }
    }

    const heap = new MinHeap();

    for (let i = 0; i < Math.min(nums1.length, k); i++) {
        heap.push([nums1[i] + nums2[0], i, 0]);
    }

    while (k > 0 && heap.size() > 0) {
        const [, i, j] = heap.pop();
        res.push([nums1[i], nums2[j]]);
        k--;
        if (j + 1 < nums2.length) {
            heap.push([nums1[i] + nums2[j + 1], i, j + 1]);
        }
    }

    return res;
}