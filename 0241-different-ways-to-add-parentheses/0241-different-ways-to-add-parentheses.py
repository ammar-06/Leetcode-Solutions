class Solution:
    def diffWaysToCompute(self, expression: str) -> List[int]:
        memo = {}

        def solve(expr):
            if expr in memo:
                return memo[expr]

            res = []
            for i, c in enumerate(expr):
                if c in "+-*":
                    left = solve(expr[:i])
                    right = solve(expr[i + 1:])
                    for a in left:
                        for b in right:
                            if c == "+":
                                res.append(a + b)
                            elif c == "-":
                                res.append(a - b)
                            else:
                                res.append(a * b)

            if not res:
                res.append(int(expr))

            memo[expr] = res
            return res

        return solve(expression)