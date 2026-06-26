class MyHashSet {
    private size = 10000;
    private table: number[][];

    constructor() {
        this.table = Array.from({ length: this.size }, () => []);
    }

    private hash(key: number): number {
        return key % this.size;
    }

    add(key: number): void {
        const idx = this.hash(key);
        const bucket = this.table[idx];

        if (!bucket.includes(key)) {
            bucket.push(key);
        }
    }

    remove(key: number): void {
        const idx = this.hash(key);
        const bucket = this.table[idx];

        const pos = bucket.indexOf(key);
        if (pos !== -1) {
            bucket.splice(pos, 1);
        }
    }

    contains(key: number): boolean {
        const idx = this.hash(key);
        return this.table[idx].includes(key);
    }
}