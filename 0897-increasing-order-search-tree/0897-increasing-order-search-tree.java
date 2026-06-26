class Solution {
    TreeNode dummy = new TreeNode(-1);
    TreeNode curr = dummy;

    public TreeNode increasingBST(TreeNode root) {
        inorder(root);
        return dummy.right;
    }

    private void inorder(TreeNode root) {
        if (root == null) return;

        inorder(root.left);

        root.left = null;
        curr.right = root;
        curr = root;

        inorder(root.right);
    }
}