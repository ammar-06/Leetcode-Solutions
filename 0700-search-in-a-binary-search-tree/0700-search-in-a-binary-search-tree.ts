function searchBST(root: any, val: number): any {
    while (root) {
        if (root.val === val) return root;
        if (val < root.val) root = root.left;
        else root = root.right;
    }
    return null;
}