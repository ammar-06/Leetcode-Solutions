/**
 * // Definition for a Node.
 * function Node(val, children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node|null} root
 * @return {number[]}
 */
var postorder = function(root) {
    if (!root) return [];
    const res = [];
    const stack = [root];

    while (stack.length) {
        const node = stack.pop();
        res.push(node.val);
        for (const child of node.children) {
            stack.push(child);
        }
    }

    return res.reverse();
};