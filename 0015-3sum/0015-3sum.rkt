(define/contract (three-sum nums)
  (-> (listof exact-integer?) (listof (listof exact-integer?)))
  (define sorted (sort nums <))
  (define n (length sorted))
  (define vec (list->vector sorted))
  (define result '())
  (for ([i (in-range n)])
    (when (or (= i 0) (not (= (vector-ref vec i) (vector-ref vec (sub1 i)))))
      (let loop ([lo (add1 i)] [hi (sub1 n)])
        (when (< lo hi)
          (define sum (+ (vector-ref vec i) (vector-ref vec lo) (vector-ref vec hi)))
          (cond
            [(< sum 0) (loop (add1 lo) hi)]
            [(> sum 0) (loop lo (sub1 hi))]
            [else
             (set! result (cons (list (vector-ref vec i) (vector-ref vec lo) (vector-ref vec hi)) result))
             (let skip-lo ([l (add1 lo)])
               (if (and (< l hi) (= (vector-ref vec l) (vector-ref vec lo)))
                   (skip-lo (add1 l))
                   (let skip-hi ([h (sub1 hi)])
                     (if (and (> h l) (= (vector-ref vec h) (vector-ref vec hi)))
                         (skip-hi (sub1 h))
                         (loop l h)))))])))))
  result)