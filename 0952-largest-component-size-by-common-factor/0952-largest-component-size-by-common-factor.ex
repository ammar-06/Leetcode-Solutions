defmodule Solution do
  @spec largest_component_size(nums :: [integer]) :: integer
  def largest_component_size(nums) do
    dsu = Enum.reduce(nums, %{}, fn num, acc ->
      factors = get_prime_factors(num, 2, [])
      Enum.reduce(factors, acc, fn f, dsu_acc ->
        union(dsu_acc, num, f)
      end)
    end)
    
    {_, counts} = Enum.reduce(nums, {dsu, %{}}, fn num, {dsu_acc, counts} ->
      {root, next_dsu} = find(dsu_acc, num)
      {next_dsu, Map.update(counts, root, 1, &(&1 + 1))}
    end)
    
    counts |> Map.values() |> Enum.max(fn -> 0 end)
  end
  
  defp get_prime_factors(1, _, acc), do: acc
  defp get_prime_factors(x, div, acc) when div * div > x, do: [x | acc]
  defp get_prime_factors(x, div, acc) do
    if rem(x, div) == 0 do
      new_x = strip_factor(x, div)
      get_prime_factors(new_x, next_div(div), [div | acc])
    else
      get_prime_factors(x, next_div(div), acc)
    end
  end

  defp next_div(2), do: 3
  defp next_div(d), do: d + 2

  defp strip_factor(x, div) when rem(x, div) == 0, do: strip_factor(div(x, div), div)
  defp strip_factor(x, _div), do: x

  defp find(dsu, x) do
    case Map.get(dsu, x) do
      nil -> {x, Map.put(dsu, x, x)}
      ^x -> {x, dsu}
      p ->
        {root, next_dsu} = find(dsu, p)
        {root, Map.put(next_dsu, x, root)}
    end
  end

  defp union(dsu, x, y) do
    {rx, dsu1} = find(dsu, x)
    {ry, dsu2} = find(dsu1, y)
    if rx != ry do
      Map.put(dsu2, rx, ry)
    else
      dsu2
    end
  end
end