var flatten = function(head) {
    if (!head) return head;

    const stack = [head];

    while (stack.length) {
        const curr = stack.pop();

        if (curr.next) {
            stack.push(curr.next);
        }

        if (curr.child) {
            stack.push(curr.child);
            curr.child = null;
        }

        if (stack.length) {
            const next = stack[stack.length - 1];
            curr.next = next;
            next.prev = curr;
        } else {
            curr.next = null;
        }
    }

    return head;
};