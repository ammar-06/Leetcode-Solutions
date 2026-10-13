/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
class Codec {
public:
    // Encodes a tree to a single string.
    string serialize(TreeNode* root) {
        string res;
        preorder(root, res);
        return res;
    }

    // Decodes your encoded data to tree.
    TreeNode* deserialize(string data) {
        vector<int> vals;
        int i = 0, n = data.size();
        while (i < n) {
            int j = i;
            while (j < n && data[j] != ',') j++;
            vals.push_back(stoi(data.substr(i, j - i)));
            i = j + 1;
        }
        int idx = 0;
        return build(vals, idx, INT_MIN, INT_MAX);
    }

private:
    void preorder(TreeNode* node, string& res) {
        if (!node) return;
        if (!res.empty()) res += ',';
        res += to_string(node->val);
        preorder(node->left, res);
        preorder(node->right, res);
    }

    TreeNode* build(vector<int>& vals, int& idx, int lo, int hi) {
        if (idx == (int)vals.size() || vals[idx] < lo || vals[idx] > hi) return nullptr;
        int v = vals[idx++];
        TreeNode* node = new TreeNode(v);
        node->left = build(vals, idx, lo, v);
        node->right = build(vals, idx, v, hi);
        return node;
    }
};

// Your Codec object will be instantiated and called as such:
// Codec* ser = new Codec();
// Codec* deser = new Codec();
// string tree = ser->serialize(root);
// TreeNode* ans = deser->deserialize(tree);
// return ans;