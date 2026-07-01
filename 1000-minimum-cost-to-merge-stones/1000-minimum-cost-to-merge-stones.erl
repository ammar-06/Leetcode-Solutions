-spec merge_stones(Stones :: [integer()], K :: integer()) -> integer().
merge_stones(Stones, K) ->
    N = length(Stones),
    case ((N - 1) rem (K - 1)) of
        0 ->
            Arr = array:from_list(Stones),
            Prefix = build_prefix(Arr, N),
            Dp0 = init_dp(N),
            Dp = solve_len(2, N, K, Prefix, Dp0),
            maps:get({0, N - 1}, Dp);
        _ ->
            -1
    end.

build_prefix(Arr, N) ->
    build_prefix(0, N, Arr, array:new(N + 1, {default, 0})).

build_prefix(I, N, _, Prefix) when I >= N ->
    Prefix;
build_prefix(I, N, Arr, Prefix) ->
    S = array:get(I, Prefix) + array:get(I, Arr),
    build_prefix(I + 1, N, Arr, array:set(I + 1, S, Prefix)).

sum(Prefix, L, R) ->
    array:get(R + 1, Prefix) - array:get(L, Prefix).

init_dp(N) ->
    init_dp(0, N, #{}).

init_dp(I, N, Dp) when I >= N ->
    Dp;
init_dp(I, N, Dp) ->
    init_dp(I + 1, N, maps:put({I, I}, 0, Dp)).

solve_len(Len, N, _, _, Dp) when Len > N ->
    Dp;
solve_len(Len, N, K, Prefix, Dp) ->
    Dp1 = solve_start(0, N - Len, Len, K, Prefix, Dp),
    solve_len(Len + 1, N, K, Prefix, Dp1).

solve_start(I, Max, _, _, _, Dp) when I > Max ->
    Dp;
solve_start(I, Max, Len, K, Prefix, Dp) ->
    J = I + Len - 1,
    Best = split(I, J, I, K, Dp, 1000000000),
    Cost =
        case ((Len - 1) rem (K - 1)) of
            0 ->
                Best + sum(Prefix, I, J);
            _ ->
                Best
        end,
    solve_start(I + 1, Max, Len, K, Prefix, maps:put({I, J}, Cost, Dp)).

split(_, J, M, _, _, Best) when M >= J ->
    Best;
split(I, J, M, K, Dp, Best) ->
    A = maps:get({I, M}, Dp),
    B = maps:get({M + 1, J}, Dp),
    Cur = A + B,
    Best1 =
        if
            Cur < Best -> Cur;
            true -> Best
        end,
    split(I, J, M + K - 1, K, Dp, Best1).

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