import java.util.*;

class Solution {
    public NestedInteger deserialize(String s) {
        if (s.charAt(0) != '[') {
            return new NestedInteger(Integer.parseInt(s));
        }

        Stack<NestedInteger> stack = new Stack<>();
        NestedInteger curr = null;
        int num = 0;
        boolean negative = false;
        boolean hasNum = false;

        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);

            if (c == '[') {
                if (curr != null) stack.push(curr);
                curr = new NestedInteger();
            } else if (c == ']') {
                if (hasNum) {
                    if (negative) num = -num;
                    curr.add(new NestedInteger(num));
                }
                if (!stack.isEmpty()) {
                    NestedInteger parent = stack.pop();
                    parent.add(curr);
                    curr = parent;
                }
                num = 0;
                negative = false;
                hasNum = false;
            } else if (c == ',') {
                if (hasNum) {
                    if (negative) num = -num;
                    curr.add(new NestedInteger(num));
                }
                num = 0;
                negative = false;
                hasNum = false;
            } else if (c == '-') {
                negative = true;
            } else {
                num = num * 10 + (c - '0');
                hasNum = true;
            }
        }

        return curr;
    }
}