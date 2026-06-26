class KthLargest {
    private k: number;
    private heap: number[];

    constructor(k: number, nums: number[]) {
        this.k = k;
        this.heap = [];

        for (const n of nums) {
            this.add(n);
        }
    }

    add(val: number): number {
        this.heap.push(val);

        let i = this.heap.length - 1;
        while (i > 0) {
            const p = Math.floor((i - 1) / 2);
            if (this.heap[p] <= this.heap[i]) break;
            [this.heap[p], this.heap[i]] = [this.heap[i], this.heap[p]];
            i = p;
        }

        if (this.heap.length > this.k) {
            this.heap[0] = this.heap[this.heap.length - 1];
            this.heap.pop();

            let i = 0;
            while (true) {
                let smallest = i;
                const l = 2 * i + 1;
                const r = 2 * i + 2;

                if (l < this.heap.length && this.heap[l] < this.heap[smallest]) smallest = l;
                if (r < this.heap.length && this.heap[r] < this.heap[smallest]) smallest = r;

                if (smallest === i) break;

                [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
                i = smallest;
            }
        }

        return this.heap[0];
    }
}