var braceExpansionII = function(expression) {
    let pos = 0;
    
    function parseUnion() {
        const result = new Set();
        let current = parseConcat();
        for (const w of current) result.add(w);
        
        while (pos < expression.length && expression[pos] === ',') {
            pos++;
            current = parseConcat();
            for (const w of current) result.add(w);
        }
        
        return result;
    }
    
    function parseConcat() {
        let result = new Set(['']);
        
        while (pos < expression.length && expression[pos] !== ',' && expression[pos] !== '}') {
            const factor = parseFactor();
            const next = new Set();
            for (const a of result) {
                for (const b of factor) {
                    next.add(a + b);
                }
            }
            result = next;
        }
        
        return result;
    }
    
    function parseFactor() {
        if (expression[pos] === '{') {
            pos++;
            const inner = parseUnion();
            pos++;
            return inner;
        }
        const ch = expression[pos];
        pos++;
        return new Set([ch]);
    }
    
    return [...parseUnion()].sort();
};