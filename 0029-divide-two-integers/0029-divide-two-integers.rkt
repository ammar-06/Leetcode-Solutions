(define/contract (divide dividend divisor)
  (-> exact-integer? exact-integer? exact-integer?)
  (define INT-MAX (sub1 (expt 2 31)))
  (define INT-MIN (- (expt 2 31)))
  (cond
    [(and (= dividend INT-MIN) (= divisor -1)) INT-MAX]
    [else
     (define negative (not (eq? (< dividend 0) (< divisor 0))))
     (define a (abs dividend))
     (define b (abs divisor))
     (define result
       (let loop ([a a] [acc 0])
         (if (< a b)
             acc
             (let inner ([temp b] [multiple 1])
               (if (<= (* 2 temp) a)
                   (inner (* 2 temp) (* 2 multiple))
                   (loop (- a temp) (+ acc multiple)))))))
     (define final (if negative (- result) result))
     (cond
       [(> final INT-MAX) INT-MAX]
       [(< final INT-MIN) INT-MIN]
       [else final])]))