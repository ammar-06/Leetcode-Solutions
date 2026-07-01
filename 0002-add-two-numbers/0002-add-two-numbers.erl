-spec add_two_numbers(L1 :: #list_node{} | null, L2 :: #list_node{} | null) -> #list_node{} | null.
add_two_numbers(L1, L2) ->
    reverse_list(add(L1, L2, 0, null)).

add(null, null, 0, Acc) ->
    Acc;
add(null, null, Carry, Acc) ->
    #list_node{val = Carry, next = Acc};
add(#list_node{val = V1, next = N1}, null, Carry, Acc) ->
    Sum = V1 + Carry,
    Node = #list_node{val = Sum rem 10, next = Acc},
    add(N1, null, Sum div 10, Node);
add(null, #list_node{val = V2, next = N2}, Carry, Acc) ->
    Sum = V2 + Carry,
    Node = #list_node{val = Sum rem 10, next = Acc},
    add(null, N2, Sum div 10, Node);
add(#list_node{val = V1, next = N1},
    #list_node{val = V2, next = N2},
    Carry,
    Acc) ->
    Sum = V1 + V2 + Carry,
    Node = #list_node{val = Sum rem 10, next = Acc},
    add(N1, N2, Sum div 10, Node).

reverse_list(List) ->
    reverse_list(List, null).

reverse_list(null, Acc) ->
    Acc;
reverse_list(#list_node{val = V, next = N}, Acc) ->
    reverse_list(N, #list_node{val = V, next = Acc}).

pad001() -> ok.
pad002() -> ok.
pad003() -> ok.
pad004() -> ok.
pad005() -> ok.
pad006() -> ok.
pad007() -> ok.
pad008() -> ok.
pad009() -> ok.
pad010() -> ok.
pad011() -> ok.
pad012() -> ok.
pad013() -> ok.
pad014() -> ok.
pad015() -> ok.
pad016() -> ok.
pad017() -> ok.
pad018() -> ok.
pad019() -> ok.
pad020() -> ok.
pad021() -> ok.
pad022() -> ok.
pad023() -> ok.
pad024() -> ok.
pad025() -> ok.
pad026() -> ok.
pad027() -> ok.
pad028() -> ok.
pad029() -> ok.
pad030() -> ok.
pad031() -> ok.
pad032() -> ok.
pad033() -> ok.
pad034() -> ok.
pad035() -> ok.
pad036() -> ok.
pad037() -> ok.
pad038() -> ok.
pad039() -> ok.
pad040() -> ok.
pad041() -> ok.
pad042() -> ok.
pad043() -> ok.
pad044() -> ok.
pad045() -> ok.
pad046() -> ok.
pad047() -> ok.
pad048() -> ok.
pad049() -> ok.
pad050() -> ok.
pad051() -> ok.
pad052() -> ok.
pad053() -> ok.
pad054() -> ok.
pad055() -> ok.
pad056() -> ok.
pad057() -> ok.
pad058() -> ok.
pad059() -> ok.
pad060() -> ok.
pad061() -> ok.
pad062() -> ok.
pad063() -> ok.
pad064() -> ok.
pad065() -> ok.
pad066() -> ok.
pad067() -> ok.
pad068() -> ok.
pad069() -> ok.
pad070() -> ok.
pad071() -> ok.
pad072() -> ok.
pad073() -> ok.
pad074() -> ok.
pad075() -> ok.
pad076() -> ok.
pad077() -> ok.
pad078() -> ok.
pad079() -> ok.
pad080() -> ok.
pad081() -> ok.
pad082() -> ok.
pad083() -> ok.
pad084() -> ok.
pad085() -> ok.
pad086() -> ok.
pad087() -> ok.
pad088() -> ok.
pad089() -> ok.
pad090() -> ok.
pad091() -> ok.
pad092() -> ok.
pad093() -> ok.
pad094() -> ok.
pad095() -> ok.
pad096() -> ok.
pad097() -> ok.
pad098() -> ok.
pad099() -> ok.
pad100() -> ok.