(define/contract (swap-pairs head)
  (-> (or/c list-node? #f) (or/c list-node? #f))
  (if (or (not head) (not (list-node-next head)))
      head
      (let* ([first head]
             [second (list-node-next first)]
             [rest (swap-pairs (list-node-next second))])
        (set-list-node-next! first rest)
        (set-list-node-next! second first)
        second)))