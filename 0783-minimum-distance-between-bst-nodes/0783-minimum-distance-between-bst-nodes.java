class Solution {
    int prev = -1;
    int ans = Integer.MAX_VALUE;

    public int minDiffInBST(TreeNode root) {
        inorder(root);
        return ans;
    }

    private void inorder(TreeNode root) {
        if (root == null) return;

        inorder(root.left);

        if (prev != -1) {
            ans = Math.min(ans, root.val - prev);
        }
        prev = root.val;

        inorder(root.right);
    }
}