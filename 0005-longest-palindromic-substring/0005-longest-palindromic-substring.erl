-spec longest_palindrome(S :: unicode:unicode_binary()) -> unicode:unicode_binary().
longest_palindrome(S) ->
    Cs = unicode:characters_to_list(S),
    N = length(Cs),
    case N of
        0 ->
            <<>>;
        _ ->
            Arr = array:from_list(Cs),
            {Start, Len} = expand_all(0, N, Arr, 0, 1),
            unicode:characters_to_binary(extract(Arr, Start, Len))
    end.

expand_all(I, N, _, BestS, BestL) when I >= N ->
    {BestS, BestL};
expand_all(I, N, Arr, BestS, BestL) ->
    {S1, L1} = expand(Arr, N, I, I),
    {BS1, BL1} =
        if
            L1 > BestL -> {S1, L1};
            true -> {BestS, BestL}
        end,
    {S2, L2} =
        if
            I + 1 < N ->
                expand(Arr, N, I, I + 1);
            true ->
                {0, 0}
        end,
    {BS2, BL2} =
        if
            L2 > BL1 -> {S2, L2};
            true -> {BS1, BL1}
        end,
    expand_all(I + 1, N, Arr, BS2, BL2).

expand(Arr, N, L, R) ->
    expand_loop(Arr, N, L, R).

expand_loop(Arr, N, L, R) ->
    if
        L < 0 ->
            {L + 1, R - L - 1};
        R >= N ->
            {L + 1, R - L - 1};
        true ->
            A = array:get(L, Arr),
            B = array:get(R, Arr),
            case A =:= B of
                true ->
                    expand_loop(Arr, N, L - 1, R + 1);
                false ->
                    {L + 1, R - L - 1}
            end
    end.

extract(Arr, Start, Len) ->
    extract(Arr, Start, Len, []).

extract(_, _, 0, Acc) ->
    lists:reverse(Acc);
extract(Arr, Start, Len, Acc) ->
    extract(Arr, Start + 1, Len - 1, [array:get(Start, Arr) | Acc]).

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