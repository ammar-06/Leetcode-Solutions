class MyHashMap {
    private size = 10000;
    private table: [number, number][][];

    constructor() {
        this.table = Array.from({ length: this.size }, () => []);
    }

    private hash(key: number): number {
        return key % this.size;
    }

    put(key: number, value: number): void {
        const idx = this.hash(key);
        const bucket = this.table[idx];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket[i][1] = value;
                return;
            }
        }

        bucket.push([key, value]);
    }

    get(key: number): number {
        const idx = this.hash(key);
        const bucket = this.table[idx];

        for (const [k, v] of bucket) {
            if (k === key) return v;
        }

        return -1;
    }

    remove(key: number): void {
        const idx = this.hash(key);
        const bucket = this.table[idx];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1);
                return;
            }
        }
    }
}