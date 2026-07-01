defmodule Solution do
  use Bitwise

  @spec shortest_superstring(words :: [String.t()]) :: String.t()
  def shortest_superstring(words) do
    n = length(words)
    words_tuple = List.to_tuple(words)

    graph =
      for i <- 0..(n - 1), j <- 0..(n - 1), i != j, into: %{} do
        {{i, j}, calc_overlap(elem(words_tuple, i), elem(words_tuple, j))}
      end

    initial_dp = for i <- 0..(n - 1), into: %{}, do: {{1 <<< i, i}, {0, nil}}

    dp =
      Enum.reduce(1..((1 <<< n) - 1), initial_dp, fn mask, acc ->
        Enum.reduce(0..(n - 1), acc, fn i, acc_i ->
          if (mask &&& (1 <<< i)) > 0 do
            case Map.get(acc_i, {mask, i}) do
              nil -> acc_i
              {val, _} ->
                Enum.reduce(0..(n - 1), acc_i, fn j, acc_j ->
                  if (mask &&& (1 <<< j)) == 0 do
                    new_mask = mask ||| (1 <<< j)
                    ov = Map.get(graph, {i, j}, 0)
                    new_val = val + ov
                    current_best = Map.get(acc_j, {new_mask, j}, {-1, nil})

                    if new_val > elem(current_best, 0) do
                      Map.put(acc_j, {new_mask, j}, {new_val, i})
                    else
                      acc_j
                    end
                  else
                    acc_j
                  end
                end)
            end
          else
            acc_i
          end
        end)
      end)

    full_mask = (1 <<< n) - 1

    {best_i, _} =
      0..(n - 1)
      |> Enum.map(fn i -> {i, Map.get(dp, {full_mask, i}, {0, nil})} end)
      |> Enum.max_by(fn {_, {val, _}} -> val end, fn -> {0, {0, nil}} end)

    path = backtrack(dp, full_mask, best_i, [])

    [first_idx | rest_idx] = path
    first_word = elem(words_tuple, first_idx)

    {result, _} =
      Enum.reduce(rest_idx, {first_word, first_idx}, fn idx, {str, prev_idx} ->
        w = elem(words_tuple, idx)
        ov = Map.get(graph, {prev_idx, idx}, 0)
        added_part = binary_part(w, ov, byte_size(w) - ov)
        {str <> added_part, idx}
      end)

    result
  end

  defp calc_overlap(w1, w2) do
    len1 = byte_size(w1)
    len2 = byte_size(w2)
    min_len = min(len1, len2)

    Enum.reduce_while(min_len..1//-1, 0, fn k, _acc ->
      if binary_part(w1, len1 - k, k) == binary_part(w2, 0, k) do
        {:halt, k}
      else
        {:cont, 0}
      end
    end)
  end

  defp backtrack(_dp, mask, _i, path) when mask == 0, do: path
  defp backtrack(dp, mask, i, path) do
    case Map.get(dp, {mask, i}) do
      {_val, nil} -> [i | path]
      {_val, parent} -> backtrack(dp, mask ^^^ (1 <<< i), parent, [i | path])
    end
  end
end