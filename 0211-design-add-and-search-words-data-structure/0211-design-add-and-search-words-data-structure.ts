class TrieNode {
    children: Map<string, TrieNode>;
    isEnd: boolean;

    constructor() {
        this.children = new Map();
        this.isEnd = false;
    }
}

class WordDictionary {
    private root: TrieNode;

    constructor() {
        this.root = new TrieNode();
    }

    addWord(word: string): void {
        let node = this.root;
        for (const ch of word) {
            if (!node.children.has(ch)) {
                node.children.set(ch, new TrieNode());
            }
            node = node.children.get(ch)!;
        }
        node.isEnd = true;
    }

    search(word: string): boolean {
        const dfs = (node: TrieNode, index: number): boolean => {
            if (index === word.length) return node.isEnd;

            const ch = word[index];

            if (ch === '.') {
                for (const child of node.children.values()) {
                    if (dfs(child, index + 1)) return true;
                }
                return false;
            }

            if (!node.children.has(ch)) return false;
            return dfs(node.children.get(ch)!, index + 1);
        };

        return dfs(this.root, 0);
    }
}