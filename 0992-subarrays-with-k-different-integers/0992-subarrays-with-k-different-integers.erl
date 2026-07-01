-spec subarrays_with_k_distinct(Nums :: [integer()], K :: integer()) -> integer().
subarrays_with_k_distinct(Nums, K) ->
    at_most(Nums, K) - at_most(Nums, K - 1).

at_most(_, K) when K < 0 ->
    0;
at_most(Nums, K) ->
    Arr = array:from_list(Nums),
    N = length(Nums),
    at_most_loop(Arr, N, 0, 0, K, #{}, 0, 0).

at_most_loop(_, N, Right, Left, _, _, _, Ans) when Right >= N ->
    Ans;
at_most_loop(Arr, N, Right, Left, K, Map, Distinct, Ans) ->
    Val = array:get(Right, Arr),
    Old = maps:get(Val, Map, 0),
    Map1 = maps:put(Val, Old + 1, Map),
    Distinct1 =
        case Old of
            0 -> Distinct + 1;
            _ -> Distinct
        end,
    {Left1, Map2, Distinct2} =
        shrink(Arr, Left, Right, K, Map1, Distinct1),
    Ans1 = Ans + (Right - Left1 + 1),
    at_most_loop(
        Arr,
        N,
        Right + 1,
        Left1,
        K,
        Map2,
        Distinct2,
        Ans1
    ).

shrink(Arr, Left, Right, K, Map, Distinct) ->
    case Distinct =< K of
        true ->
            {Left, Map, Distinct};
        false ->
            Val = array:get(Left, Arr),
            Cnt = maps:get(Val, Map),
            case Cnt of
                1 ->
                    Map1 = maps:remove(Val, Map),
                    shrink(
                        Arr,
                        Left + 1,
                        Right,
                        K,
                        Map1,
                        Distinct - 1
                    );
                _ ->
                    Map1 = maps:put(Val, Cnt - 1, Map),
                    shrink(
                        Arr,
                        Left + 1,
                        Right,
                        K,
                        Map1,
                        Distinct
                    )
            end
    end.

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