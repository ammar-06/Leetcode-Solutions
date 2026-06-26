import java.util.*;

class Solution {
    public boolean leafSimilar(TreeNode root1, TreeNode root2) {
        List<Integer> a = new ArrayList<>();
        List<Integer> b = new ArrayList<>();

        dfs(root1, a);
        dfs(root2, b);

        if (a.size() != b.size()) return false;

        for (int i = 0; i < a.size(); i++) {
            if (!a.get(i).equals(b.get(i))) return false;
        }

        return true;
    }

    private void dfs(TreeNode root, List<Integer> res) {
        if (root == null) return;

        if (root.left == null && root.right == null) {
            res.add(root.val);
            return;
        }

        dfs(root.left, res);
        dfs(root.right, res);
    }
}