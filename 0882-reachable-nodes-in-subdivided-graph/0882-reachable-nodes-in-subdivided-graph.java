import java.util.*;

class Solution {
    public int reachableNodes(int[][] edges, int maxMoves, int n) {
        Map<Integer, Map<Integer, Integer>> graph = new HashMap<>();

        for (int i = 0; i < n; i++) {
            graph.put(i, new HashMap<>());
        }

        for (int[] e : edges) {
            graph.get(e[0]).put(e[1], e[2]);
            graph.get(e[1]).put(e[0], e[2]);
        }

        int[] dist = new int[n];
        Arrays.fill(dist, Integer.MAX_VALUE);

        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[1] - b[1]);
        pq.offer(new int[]{0, 0});
        dist[0] = 0;

        while (!pq.isEmpty()) {
            int[] cur = pq.poll();
            int node = cur[0], d = cur[1];

            if (d > dist[node]) continue;

            for (Map.Entry<Integer, Integer> nei : graph.get(node).entrySet()) {
                int nxt = nei.getKey();
                int w = nei.getValue();

                int nd = d + w + 1;
                if (nd < dist[nxt]) {
                    dist[nxt] = nd;
                    pq.offer(new int[]{nxt, nd});
                }
            }
        }

        long res = 0;

        for (int i = 0; i < n; i++) {
            if (dist[i] <= maxMoves) res++;
        }

        for (int[] e : edges) {
            long a = Math.max(0, maxMoves - dist[e[0]]);
            long b = Math.max(0, maxMoves - dist[e[1]]);
            res += Math.min(e[2], a + b);
        }

        return (int) res;
    }
}