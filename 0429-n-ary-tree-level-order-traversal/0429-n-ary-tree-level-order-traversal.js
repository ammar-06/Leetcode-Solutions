var levelOrder = function(root) {
    if (!root) return [];

    const result = [];
    const queue = [root];
    let index = 0;

    while (index < queue.length) {
        const size = queue.length - index;
        const level = [];

        for (let i = 0; i < size; i++) {
            const node = queue[index++];
            level.push(node.val);

            for (const child of node.children) {
                queue.push(child);
            }
        }

        result.push(level);
    }

    return result;
};