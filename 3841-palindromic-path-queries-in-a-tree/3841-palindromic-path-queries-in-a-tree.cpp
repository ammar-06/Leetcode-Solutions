class Solution {
    int n, LOG;
    vector<int> bit, tin, tout, depth;
    vector<vector<int>> up;

    void bitUpdate(int i, int v) {
        for (i++; i <= n + 1; i += i & -i) bit[i] ^= v;
    }

    int bitQuery(int i) {
        int r = 0;
        for (i++; i > 0; i -= i & -i) r ^= bit[i];
        return r;
    }

    void rangeXor(int l, int r, int v) {
        bitUpdate(l, v);
        bitUpdate(r + 1, v);
    }

    int lca(int a, int b) {
        if (depth[a] < depth[b]) swap(a, b);
        int diff = depth[a] - depth[b];
        for (int k = 0; k < LOG; k++)
            if (diff >> k & 1) a = up[k][a];
        if (a == b) return a;
        for (int k = LOG - 1; k >= 0; k--) {
            if (up[k][a] != up[k][b]) {
                a = up[k][a];
                b = up[k][b];
            }
        }
        return up[0][a];
    }

public:
    vector<bool> palindromePath(int n, vector<vector<int>>& edges, string s, vector<string>& queries) {
        this->n = n;
        LOG = 1;
        while ((1 << LOG) < n) LOG++;
        vector<vector<int>> adj(n);
        for (auto& e : edges) {
            adj[e[0]].push_back(e[1]);
            adj[e[1]].push_back(e[0]);
        }
        tin.assign(n, 0);
        tout.assign(n, 0);
        depth.assign(n, 0);
        up.assign(LOG, vector<int>(n, 0));
        bit.assign(n + 2, 0);

        vector<int> it(n, 0);
        vector<int> st = {0};
        vector<bool> vis(n, false);
        vis[0] = true;
        int timer = 0;
        tin[0] = timer++;
        while (!st.empty()) {
            int v = st.back();
            if (it[v] < (int)adj[v].size()) {
                int u = adj[v][it[v]++];
                if (!vis[u]) {
                    vis[u] = true;
                    up[0][u] = v;
                    depth[u] = depth[v] + 1;
                    tin[u] = timer++;
                    st.push_back(u);
                }
            } else {
                tout[v] = timer - 1;
                st.pop_back();
            }
        }
        for (int k = 1; k < LOG; k++)
            for (int v = 0; v < n; v++)
                up[k][v] = up[k - 1][up[k - 1][v]];

        vector<int> mask(n);
        for (int v = 0; v < n; v++) {
            mask[v] = 1 << (s[v] - 'a');
            rangeXor(tin[v], tout[v], mask[v]);
        }

        vector<bool> ans;
        for (auto& q : queries) {
            stringstream ss(q);
            string type;
            ss >> type;
            if (type == "update") {
                int u;
                string c;
                ss >> u >> c;
                int nm = 1 << (c[0] - 'a');
                if (nm != mask[u]) {
                    rangeXor(tin[u], tout[u], mask[u] ^ nm);
                    mask[u] = nm;
                }
            } else {
                int u, v;
                ss >> u >> v;
                int w = lca(u, v);
                int m = bitQuery(tin[u]) ^ bitQuery(tin[v]) ^ mask[w];
                ans.push_back((m & (m - 1)) == 0);
            }
        }
        return ans;
    }
};