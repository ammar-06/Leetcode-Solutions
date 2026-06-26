class Solution {
public:
    int ans = 0;

    int depth(TreeNode* root) {
        if (!root) return 0;
        int l = depth(root->left);
        int r = depth(root->right);
        ans = max(ans, l + r);
        return 1 + max(l, r);
    }

    int diameterOfBinaryTree(TreeNode* root) {
        depth(root);
        return ans;
    }
};