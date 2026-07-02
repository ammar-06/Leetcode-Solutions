(define/contract (three-sum-closest nums target)
  (-> (listof exact-integer?) exact-integer? exact-integer?)
  (define v (list->vector (sort nums <)))
  (define n (vector-length v))
  (define best (+ (vector-ref v 0) (vector-ref v 1) (vector-ref v 2)))
  (let loopi ([i 0])
    (when (< i (- n 2))
      (let loopp ([l (+ i 1)] [r (- n 1)])
        (when (< l r)
          (define s (+ (vector-ref v i) (vector-ref v l) (vector-ref v r)))
          (when (< (abs (- s target)) (abs (- best target)))
            (set! best s))
          (cond
            [(< s target) (loopp (+ l 1) r)]
            [(> s target) (loopp l (- r 1))]
            [else (set! best target)])))
      (loopi (+ i 1))))
  best)