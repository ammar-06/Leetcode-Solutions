function findSecondMinimumValue(root: any): number {
    const min = root.val;
    let second = Infinity;

    const dfs = (node: any) => {
        if (!node) return;

        if (node.val > min && node.val < second) {
            second = node.val;
        }

        dfs(node.left);
        dfs(node.right);
    };

    dfs(root);

    return second === Infinity ? -1 : second;
}