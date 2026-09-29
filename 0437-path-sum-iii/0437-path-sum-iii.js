var pathSum = function(root, targetSum) {
    const prefix = new Map();
    prefix.set(0, 1);

    let result = 0;

    const dfs = (node, sum) => {
        if (!node) return;

        sum += node.val;

        result += prefix.get(sum - targetSum) || 0;

        prefix.set(sum, (prefix.get(sum) || 0) + 1);

        dfs(node.left, sum);
        dfs(node.right, sum);

        prefix.set(sum, prefix.get(sum) - 1);
    };

    dfs(root, 0);

    return result;
};