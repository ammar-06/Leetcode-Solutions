class NestedIterator {
    private stack: NestedInteger[];

    constructor(nestedList: NestedInteger[]) {
        this.stack = [];
        for (let i = nestedList.length - 1; i >= 0; i--) {
            this.stack.push(nestedList[i]);
        }
    }

    hasNext(): boolean {
        while (this.stack.length > 0) {
            const top = this.stack[this.stack.length - 1];
            if (top.isInteger()) return true;

            this.stack.pop();
            const list = top.getList();
            for (let i = list.length - 1; i >= 0; i--) {
                this.stack.push(list[i]);
            }
        }
        return false;
    }

    next(): number {
        this.hasNext();
        return this.stack.pop()!.getInteger()!;
    }
}