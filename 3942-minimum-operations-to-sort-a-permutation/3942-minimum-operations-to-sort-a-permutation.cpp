class Solution {
public:
    int minOperations(vector<int>& nums) {
        int n = nums.size();
        vector<int> rev(nums.rbegin(), nums.rend());
        auto targetShift = [&](vector<int>& a) {
            int k = find(a.begin(), a.end(), 0) - a.begin();
            for (int i = 0; i < n; i++)
                if (a[(i + k) % n] != i) return -1;
            return k;
        };
        int t0 = targetShift(nums), t1 = targetShift(rev);
        if (t0 == -1 && t1 == -1) return -1;
        vector<int> dist(2 * n, -1);
        queue<int> q;
        dist[0] = 0;
        q.push(0);
        while (!q.empty()) {
            int s = q.front(); q.pop();
            int r = s / n, k = s % n;
            if ((r == 0 && k == t0) || (r == 1 && k == t1)) return dist[s];
            int a = r * n + (k + 1) % n;
            int b = (1 - r) * n + (n - k) % n;
            for (int nx : {a, b}) {
                if (dist[nx] == -1) {
                    dist[nx] = dist[s] + 1;
                    q.push(nx);
                }
            }
        }
        return -1;
    }
};