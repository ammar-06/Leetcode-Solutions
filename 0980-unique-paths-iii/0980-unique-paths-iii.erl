-spec unique_paths_iii(Grid :: [[integer()]]) -> integer().
unique_paths_iii(Grid) ->
    M = length(Grid),
    N = length(hd(Grid)),
    {Map, Start, Count} = build(Grid, 0, #{}, {-1,-1}, 0),
    dfs(Start, Map, Count, M, N).

build([], _, Map, Start, Count) ->
    {Map, Start, Count};
build([Row | Rs], R, Map, Start, Count) ->
    {Map1, Start1, Count1} = build_row(Row, R, 0, Map, Start, Count),
    build(Rs, R + 1, Map1, Start1, Count1).

build_row([], _, _, Map, Start, Count) ->
    {Map, Start, Count};
build_row([V | Vs], R, C, Map, Start, Count) ->
    Pos = {R, C},
    Map1 = maps:put(Pos, V, Map),
    Start1 = case V of
        1 -> Pos;
        _ -> Start
    end,
    Count1 = case V of
        -1 -> Count;
        _ -> Count + 1
    end,
    build_row(Vs, R, C + 1, Map1, Start1, Count1).

dfs(Pos, Map, Left, M, N) ->
    V = maps:get(Pos, Map),
    case V of
        2 ->
            case Left of
                1 -> 1;
                _ -> 0
            end;
        _ ->
            Map1 = maps:put(Pos, -1, Map),
            {R, C} = Pos,
            explore([{R+1,C},{R-1,C},{R,C+1},{R,C-1}], Map1, Left - 1, M, N)
    end.

explore([], _, _, _, _) ->
    0;
explore([{R,C}=Pos | Rest], Map, Left, M, N) ->
    Add =
        if
            R < 0; R >= M; C < 0; C >= N ->
                0;
            true ->
                case maps:get(Pos, Map, -1) of
                    -1 -> 0;
                    _ -> dfs(Pos, Map, Left, M, N)
                end
        end,
    Add + explore(Rest, Map, Left, M, N).