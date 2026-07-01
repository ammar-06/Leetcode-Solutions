defmodule Solution do
  @spec tallest_billboard(rods :: [integer]) :: integer
  def tallest_billboard(rods) do
    dp0 = %{0 => 0}

    final_dp =
      Enum.reduce(rods, dp0, fn r, dp ->
        Enum.reduce(dp, dp, fn {diff, taller}, acc ->
          shorter = taller - diff

          new_taller1 = taller + r
          new_diff1 = new_taller1 - shorter
          acc1 = Map.update(acc, new_diff1, new_taller1, &max(&1, new_taller1))

          new_shorter2 = shorter + r
          new_diff2 = abs(taller - new_shorter2)
          new_taller2 = max(taller, new_shorter2)
          acc2 = Map.update(acc1, new_diff2, new_taller2, &max(&1, new_taller2))

          acc2
        end)
      end)

    Map.get(final_dp, 0, 0)
  end
end