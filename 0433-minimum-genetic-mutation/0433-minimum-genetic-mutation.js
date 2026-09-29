var minMutation = function(startGene, endGene, bank) {
    const bankSet = new Set(bank);
    if (!bankSet.has(endGene)) return -1;

    const queue = [[startGene, 0]];
    const visited = new Set([startGene]);
    const genes = ['A', 'C', 'G', 'T'];

    let index = 0;

    while (index < queue.length) {
        const [gene, steps] = queue[index++];

        if (gene === endGene) return steps;

        for (let i = 0; i < 8; i++) {
            for (const char of genes) {
                if (char === gene[i]) continue;

                const next = gene.slice(0, i) + char + gene.slice(i + 1);

                if (bankSet.has(next) && !visited.has(next)) {
                    visited.add(next);
                    queue.push([next, steps + 1]);
                }
            }
        }
    }

    return -1;
};