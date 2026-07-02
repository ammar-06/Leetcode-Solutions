(define/contract (generate-parenthesis n)
  (-> exact-integer? (listof string?))
  (define result '())
  (define (backtrack current open close)
    (cond
      [(= (string-length current) (* 2 n)) (set! result (cons current result))]
      [else
       (when (< open n) (backtrack (string-append current "(") (add1 open) close))
       (when (< close open) (backtrack (string-append current ")") open (add1 close)))]))
  (backtrack "" 0 0)
  result)