length_of_longest_substring(S) ->
    L = unicode:characters_to_list(S),
    solve(L, 0, 0, #{}, 0).

solve([], _, _, _, Best) ->
    Best;
solve([C | Rest], Left, Right, Map, Best) ->
    Prev = maps:get(C, Map, -1),
    Left1 =
        case Prev >= Left of
            true -> Prev + 1;
            false -> Left
        end,
    Len = Right - Left1 + 1,
    Best1 =
        if
            Len > Best -> Len;
            true -> Best
        end,
    Map1 = maps:put(C, Right, Map),
    solve(Rest, Left1, Right + 1, Map1, Best1).