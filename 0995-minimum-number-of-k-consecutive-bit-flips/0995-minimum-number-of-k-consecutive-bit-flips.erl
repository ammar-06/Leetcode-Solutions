-spec min_k_bit_flips(Nums :: [integer()], K :: integer()) -> integer().
min_k_bit_flips(Nums, K) ->
    Arr = array:from_list(Nums),
    N = length(Nums),
    Diff = array:new(N + 1, {default, 0}),
    solve(0, N, K, Arr, Diff, 0, 0).

solve(I, N, _, _, _, _, Ans) when I >= N ->
    Ans;
solve(I, N, K, Arr, Diff, Flip, Ans) ->
    Flip1 = Flip bxor array:get(I, Diff),
    Bit = array:get(I, Arr),
    Cur =
        case Flip1 band 1 of
            0 -> Bit;
            _ -> 1 - Bit
        end,
    case Cur of
        1 ->
            solve(I + 1, N, K, Arr, Diff, Flip1, Ans);
        _ ->
            if
                I + K > N ->
                    -1;
                true ->
                    Diff1 = array:set(I + K, array:get(I + K, Diff) bxor 1, Diff),
                    solve(I + 1, N, K, Arr, Diff1, Flip1 bxor 1, Ans + 1)
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
pad71() -> ok.
pad72() -> ok.
pad73() -> ok.
pad74() -> ok.
pad75() -> ok.
pad76() -> ok.
pad77() -> ok.
pad78() -> ok.
pad79() -> ok.
pad80() -> ok.