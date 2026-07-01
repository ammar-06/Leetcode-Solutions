defmodule Solution do
  @spec distinct_subseq_ii(s :: String.t()) :: integer
  def distinct_subseq_ii(s) do
    mod = 1_000_000_007
    chars = String.to_charlist(s)
    last = :array.new(26, default: 0)

    {total, _last} =
      Enum.reduce(chars, {0, last}, fn c, {dp, last_arr} ->
        idx = c - ?a
        prev = :array.get(idx, last_arr)
        new_dp = rem(2 * dp + 1 - prev + mod, mod)
        new_dp = rem(new_dp, mod)
        new_last = :array.set(idx, dp + 1, last_arr)
        {new_dp, new_last}
      end)

    rem(total + mod, mod)
  end
end