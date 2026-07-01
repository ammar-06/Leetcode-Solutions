-spec count_triplets(Nums :: [integer()]) -> integer().
count_triplets(Nums) ->
  PairCounts = lists:foldl(
    fun(A, Acc) ->
      lists:foldl(
        fun(B, Acc2) ->
          V = A band B,
          maps:update_with(V, fun(X) -> X + 1 end, 1, Acc2)
        end, Acc, Nums)
    end, #{}, Nums),
  lists:foldl(
    fun(C, Total) ->
      maps:fold(
        fun(V, Cnt, Acc) ->
          case V band C of
            0 -> Acc + Cnt;
            _ -> Acc
          end
        end, Total, PairCounts)
    end, 0, Nums).