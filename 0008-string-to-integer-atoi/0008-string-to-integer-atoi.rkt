(define/contract (my-atoi s)
  (-> string? exact-integer?)
  (define len (string-length s))
  (define i 0)

  (let loop ()
    (when (and (< i len) (char=? (string-ref s i) #\space))
      (set! i (add1 i))
      (loop)))

  (define sign 1)
  (when (< i len)
    (cond
      [(char=? (string-ref s i) #\-)
       (set! sign -1)
       (set! i (add1 i))]
      [(char=? (string-ref s i) #\+)
       (set! i (add1 i))]))

  (let loop ()
    (when (and (< i len) (char=? (string-ref s i) #\0))
      (set! i (add1 i))
      (loop)))

  (define num 0)
  (define found? #f)

  (let loop ()
    (when (and (< i len) (char-numeric? (string-ref s i)))
      (set! found? #t)
      (set! num (+ (* num 10)
                   (- (char->integer (string-ref s i))
                      (char->integer #\0))))
      (set! i (add1 i))
      (loop)))

  (if (not found?)
      0
      (let* ([ans (* sign num)]
             [INT-MIN (- (expt 2 31))]
             [INT-MAX (- (expt 2 31) 1)])
        (cond
          [(< ans INT-MIN) INT-MIN]
          [(> ans INT-MAX) INT-MAX]
          [else ans]))))