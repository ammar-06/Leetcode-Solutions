function kthSmallest(root: TreeNode | null, k: number): number {
    const stack: TreeNode[] = [];
    let node = root;

    while (stack.length || node) {
        while (node) {
            stack.push(node);
            node = node.left;
        }

        node = stack.pop()!;
        if (--k === 0) return node.val;
        node = node.right;
    }

    return -1;
}