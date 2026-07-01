defmodule Solution do
  @spec least_ops_express_target(x :: integer, target :: integer) :: integer
  def least_ops_express_target(x, target) do
    {ans, _} = dfs(x, 0, target, %{})
    ans - 1
  end

  defp cost(0), do: 2
  defp cost(i), do: i

  defp dfs(_x, _i, 0, memo), do: {0, memo}
  defp dfs(x, i, 1, memo) do
    case Map.fetch(memo, {i, 1}) do
      {:ok, val} -> {val, memo}
      :error ->
        val = cost(i)
        {val, Map.put(memo, {i, 1}, val)}
    end
  end
  defp dfs(x, i, target, memo) do
    case Map.fetch(memo, {i, target}) do
      {:ok, val} -> {val, memo}
      :error ->
        r = rem(target, x)
        q = div(target, x)
        
        {opt1_val, memo} = dfs(x, i + 1, q, memo)
        ans1 = r * cost(i) + opt1_val

        {ans, memo} =
          if r == 0 do
            {ans1, memo}
          else
            {opt2_val, memo} = dfs(x, i + 1, q + 1, memo)
            ans2 = (x - r) * cost(i) + opt2_val
            {min(ans1, ans2), memo}
          end

        {ans, Map.put(memo, {i, target}, ans)}
    end
  end
end