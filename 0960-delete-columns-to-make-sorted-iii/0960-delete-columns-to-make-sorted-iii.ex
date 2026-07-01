defmodule Solution do
  @spec min_deletion_size(strs :: [String.t()]) :: integer
  def min_deletion_size(strs) do
    m = byte_size(hd(strs))
    tuples = Enum.map(strs, fn s -> s |> String.to_charlist() |> List.to_tuple() end)

    dp =
      Enum.reduce(0..(m - 1), %{}, fn i, dp_acc ->
        prevs =
          if i == 0 do
            []
          else
            for j <- 0..(i - 1),
                Enum.all?(tuples, fn t -> elem(t, j) <= elem(t, i) end),
                do: Map.get(dp_acc, j, 1)
          end

        max_prev = Enum.max([0 | prevs])
        Map.put(dp_acc, i, max_prev + 1)
      end)

    m - (dp |> Map.values() |> Enum.max(fn -> 0 end))
  end
end