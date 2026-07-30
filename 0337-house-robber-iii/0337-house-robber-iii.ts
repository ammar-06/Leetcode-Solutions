function rob(root: TreeNode | null): number {
    function dfs(node: TreeNode | null): [number, number] {
        if (!node) return [0, 0];

        const [leftRob, leftSkip] = dfs(node.left);
        const [rightRob, rightSkip] = dfs(node.right);

        const robThis = node.val + leftSkip + rightSkip;
        const skipThis = Math.max(leftRob, leftSkip) + Math.max(rightRob, rightSkip);

        return [robThis, skipThis];
    }

    const [robRoot, skipRoot] = dfs(root);
    return Math.max(robRoot, skipRoot);
}