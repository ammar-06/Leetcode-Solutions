/**
 * @param {TreeNode} root
 * @return {number}
 */
var averageOfSubtree = function(root) {
    let count = 0;

    const dfs = (node) => {
        if (!node) return [0, 0];

        const [leftSum, leftCount] = dfs(node.left);
        const [rightSum, rightCount] = dfs(node.right);

        const sum = node.val + leftSum + rightSum;
        const nodes = 1 + leftCount + rightCount;

        if (Math.floor(sum / nodes) === node.val) {
            count++;
        }

        return [sum, nodes];
    };

    dfs(root);
    return count;
};