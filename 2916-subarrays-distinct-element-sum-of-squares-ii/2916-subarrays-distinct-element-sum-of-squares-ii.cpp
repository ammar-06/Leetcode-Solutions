class Solution {
    vector<long long> sum, lazy;
    int n;

    void push(int node, int l, int r) {
        if (lazy[node]) {
            int m = (l + r) / 2;
            apply(node * 2, l, m, lazy[node]);
            apply(node * 2 + 1, m + 1, r, lazy[node]);
            lazy[node] = 0;
        }
    }

    void apply(int node, int l, int r, long long v) {
        sum[node] += v * (r - l + 1);
        lazy[node] += v;
    }

    void update(int node, int l, int r, int ql, int qr, long long v) {
        if (qr < l || r < ql) return;
        if (ql <= l && r <= qr) {
            apply(node, l, r, v);
            return;
        }
        push(node, l, r);
        int m = (l + r) / 2;
        update(node * 2, l, m, ql, qr, v);
        update(node * 2 + 1, m + 1, r, ql, qr, v);
        sum[node] = sum[node * 2] + sum[node * 2 + 1];
    }

    long long query(int node, int l, int r, int ql, int qr) {
        if (qr < l || r < ql) return 0;
        if (ql <= l && r <= qr) return sum[node];
        push(node, l, r);
        int m = (l + r) / 2;
        return query(node * 2, l, m, ql, qr) + query(node * 2 + 1, m + 1, r, ql, qr);
    }

public:
    int sumCounts(vector<int>& nums) {
        const long long MOD = 1e9 + 7;
        n = nums.size();
        sum.assign(4 * n, 0);
        lazy.assign(4 * n, 0);
        unordered_map<int, int> last;
        long long cur = 0, ans = 0;
        for (int j = 0; j < n; j++) {
            int p = last.count(nums[j]) ? last[nums[j]] : -1;
            long long s = query(1, 0, n - 1, p + 1, j);
            cur = (cur + 2 * (s % MOD) + (j - p)) % MOD;
            update(1, 0, n - 1, p + 1, j, 1);
            ans = (ans + cur) % MOD;
            last[nums[j]] = j;
        }
        return ans;
    }
};