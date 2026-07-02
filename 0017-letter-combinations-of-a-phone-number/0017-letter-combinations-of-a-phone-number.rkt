(define/contract (letter-combinations digits)
  (-> string? (listof string?))
  (define mapping
    (hash #\2 "abc" #\3 "def" #\4 "ghi" #\5 "jkl"
          #\6 "mno" #\7 "pqrs" #\8 "tuv" #\9 "wxyz"))
  (cond
    [(= (string-length digits) 0) '()]
    [else
     (define (helper idx)
       (if (= idx (string-length digits))
           (list "")
           (let* ([ch (string-ref digits idx)]
                  [letters (hash-ref mapping ch)]
                  [rest-combos (helper (add1 idx))])
             (for*/list ([l (in-string letters)]
                         [r (in-list rest-combos)])
               (string-append (string l) r)))))
     (helper 0)]))