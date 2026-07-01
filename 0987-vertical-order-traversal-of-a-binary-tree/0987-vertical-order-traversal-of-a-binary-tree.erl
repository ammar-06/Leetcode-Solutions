-spec vertical_traversal(Root :: #tree_node{} | null) -> [[integer()]].
vertical_traversal(Root) ->
    Nodes = traverse(Root, 0, 0, []),
    Sorted = lists:sort(fun({C1,R1,V1},{C2,R2,V2}) ->
        if
            C1 =/= C2 -> C1 < C2;
            R1 =/= R2 -> R1 < R2;
            true -> V1 =< V2
        end
    end, Nodes),
    build(Sorted, undefined, [], []).

traverse(null, _, _, Acc) ->
    Acc;
traverse(#tree_node{val = V, left = L, right = R}, Row, Col, Acc) ->
    Acc1 = [{Col, Row, V} | Acc],
    Acc2 = traverse(L, Row + 1, Col - 1, Acc1),
    traverse(R, Row + 1, Col + 1, Acc2).

build([], undefined, [], _) ->
    [];
build([], _, Curr, Res) ->
    lists:reverse([lists:reverse(Curr) | Res]);
build([{Col,_,Val} | Rest], undefined, [], Res) ->
    build(Rest, Col, [Val], Res);
build([{Col,_,Val} | Rest], Col, Curr, Res) ->
    build(Rest, Col, [Val | Curr], Res);
build([{Col,_,Val} | Rest], _, Curr, Res) ->
    build(Rest, Col, [Val], [lists:reverse(Curr) | Res]).