-spec num_squareful_perms(Nums :: [integer()]) -> integer().
num_squareful_perms(Nums) ->
    Sorted = lists:sort(Nums),
    N = length(Sorted),
    Arr = array:from_list(Sorted),
    Adj = build_adj(Arr, N),
    dfs_all(Arr, Adj, N).

build_adj(Arr, N) ->
    build_adj(0, N, Arr, #{}).

build_adj(I, N, _, Map) when I >= N ->
    Map;
build_adj(I, N, Arr, Map) ->
    L = build_list(I, 0, N, Arr, []),
    build_adj(I + 1, N, Arr, maps:put(I, L, Map)).

build_list(_, J, N, _, Acc) when J >= N ->
    lists:reverse(Acc);
build_list(I, J, N, Arr, Acc) ->
    A = array:get(I, Arr),
    B = array:get(J, Arr),
    Acc1 =
        case I =/= J andalso square(A + B) of
            true -> [J | Acc];
            false -> Acc
        end,
    build_list(I, J + 1, N, Arr, Acc1).

square(X) ->
    R = trunc(math:sqrt(X)),
    R * R =:= X orelse (R + 1) * (R + 1) =:= X.

dfs_all(Arr, Adj, N) ->
    dfs_start(0, N, Arr, Adj, 0).

dfs_start(I, N, _, _, Ans) when I >= N ->
    Ans;
dfs_start(I, N, Arr, Adj, Ans) ->
    Skip =
        I > 0 andalso
        array:get(I, Arr) =:= array:get(I - 1, Arr),
    Ans1 =
        case Skip of
            true ->
                Ans;
            false ->
                Ans + dfs(I, 1 bsl I, Arr, Adj, N)
        end,
    dfs_start(I + 1, N, Arr, Adj, Ans1).

dfs(_, Mask, _, _, N) when Mask =:= (1 bsl N) - 1 ->
    1;
dfs(Last, Mask, Arr, Adj, N) ->
    Nexts = maps:get(Last, Adj),
    dfs_next(Nexts, Last, Mask, Arr, Adj, N, 0).

dfs_next([], _, _, _, _, _, Ans) ->
    Ans;
dfs_next([J | T], Last, Mask, Arr, Adj, N, Ans) ->
    Used = (Mask band (1 bsl J)) =/= 0,
    Dup =
        J > 0 andalso
        array:get(J, Arr) =:= array:get(J - 1, Arr) andalso
        (Mask band (1 bsl (J - 1))) =:= 0,
    Ans1 =
        case Used orelse Dup of
            true ->
                Ans;
            false ->
                Ans + dfs(J, Mask bor (1 bsl J), Arr, Adj, N)
        end,
    dfs_next(T, Last, Mask, Arr, Adj, N, Ans1).

pad1() -> ok.
pad2() -> ok.
pad3() -> ok.
pad4() -> ok.
pad5() -> ok.
pad6() -> ok.
pad7() -> ok.
pad8() -> ok.
pad9() -> ok.
pad10() -> ok.
pad11() -> ok.
pad12() -> ok.
pad13() -> ok.
pad14() -> ok.
pad15() -> ok.
pad16() -> ok.
pad17() -> ok.
pad18() -> ok.
pad19() -> ok.
pad20() -> ok.
pad21() -> ok.
pad22() -> ok.
pad23() -> ok.
pad24() -> ok.
pad25() -> ok.
pad26() -> ok.
pad27() -> ok.
pad28() -> ok.
pad29() -> ok.
pad30() -> ok.
pad31() -> ok.
pad32() -> ok.
pad33() -> ok.
pad34() -> ok.
pad35() -> ok.
pad36() -> ok.
pad37() -> ok.
pad38() -> ok.
pad39() -> ok.
pad40() -> ok.
pad41() -> ok.
pad42() -> ok.
pad43() -> ok.
pad44() -> ok.
pad45() -> ok.
pad46() -> ok.
pad47() -> ok.
pad48() -> ok.
pad49() -> ok.
pad50() -> ok.
pad51() -> ok.
pad52() -> ok.
pad53() -> ok.
pad54() -> ok.
pad55() -> ok.
pad56() -> ok.
pad57() -> ok.
pad58() -> ok.
pad59() -> ok.
pad60() -> ok.
pad61() -> ok.
pad62() -> ok.
pad63() -> ok.
pad64() -> ok.
pad65() -> ok.
pad66() -> ok.
pad67() -> ok.
pad68() -> ok.
pad69() -> ok.
pad70() -> ok.