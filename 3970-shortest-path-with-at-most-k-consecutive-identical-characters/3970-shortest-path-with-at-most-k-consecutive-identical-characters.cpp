class Solution {
public:
    int shortestPath(int n, vector<vector<int>>& edges, string labels, int k) {
        vector<vector<pair<int,int>>> adj(n);
        for (auto& e : edges) adj[e[0]].push_back({e[1], e[2]});
        const long long INF = LLONG_MAX;
        vector<long long> dist((long long)n * (k + 1), INF);
        priority_queue<pair<long long,int>, vector<pair<long long,int>>, greater<>> pq;
        auto id = [&](int v, int r) { return v * (k + 1) + r; };
        dist[id(0, 1)] = 0;
        pq.push({0, id(0, 1)});
        while (!pq.empty()) {
            auto [d, s] = pq.top(); pq.pop();
            if (d > dist[s]) continue;
            int v = s / (k + 1), r = s % (k + 1);
            if (v == n - 1) return (int)d;
            for (auto& [u, w] : adj[v]) {
                int nr = labels[u] == labels[v] ? r + 1 : 1;
                if (nr > k) continue;
                int ns = id(u, nr);
                if (d + w < dist[ns]) {
                    dist[ns] = d + w;
                    pq.push({dist[ns], ns});
                }
            }
        }
        return -1;
    }
};