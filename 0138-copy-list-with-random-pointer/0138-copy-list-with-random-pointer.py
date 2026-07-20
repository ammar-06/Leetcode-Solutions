class Solution:
    def copyRandomList(self, head: 'Optional[Node]') -> 'Optional[Node]':
        if not head:
            return None

        curr = head
        while curr:
            node = Node(curr.val)
            node.next = curr.next
            curr.next = node
            curr = node.next

        curr = head
        while curr:
            if curr.random:
                curr.next.random = curr.random.next
            curr = curr.next.next

        dummy = Node(0)
        copy = dummy
        curr = head
        while curr:
            copy.next = curr.next
            copy = copy.next
            curr.next = curr.next.next
            curr = curr.next

        return dummy.next