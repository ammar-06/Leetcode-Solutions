defmodule Solution do
  @spec odd_even_jumps(arr :: [integer]) :: integer
  def odd_even_jumps(arr) do
    n = length(arr)
    varr = List.to_tuple(arr)
    indices = 0..(n - 1) |> Enum.to_list()

    odd_sorted = Enum.sort_by(indices, fn i -> {elem(varr, i), i} end)
    odd_next = build_next(odd_sorted, n)

    even_sorted = Enum.sort_by(indices, fn i -> {-elem(varr, i), i} end)
    even_next = build_next(even_sorted, n)

    odd_can = :array.new(n, default: false)
    odd_can = :array.set(n - 1, true, odd_can)
    even_can = :array.new(n, default: false)
    even_can = :array.set(n - 1, true, even_can)

    {odd_can2, _even_can2} =
      Enum.reduce((n - 2)..0//-1, {odd_can, even_can}, fn i, {oc, ec} ->
        onext = :array.get(i, odd_next)
        enext = :array.get(i, even_next)

        oc2 =
          if onext != -1 do
            :array.set(i, :array.get(onext, ec), oc)
          else
            oc
          end

        ec2 =
          if enext != -1 do
            :array.set(i, :array.get(enext, oc), ec)
          else
            ec
          end

        {oc2, ec2}
      end)

    Enum.reduce(0..(n - 1), 0, fn i, acc ->
      if :array.get(i, odd_can2) do
        acc + 1
      else
        acc
      end
    end)
  end

  defp build_next(sorted_indices, n) do
    result = :array.new(n, default: -1)

    {result2, _stack} =
      Enum.reduce(sorted_indices, {result, []}, fn i, {res, stack} ->
        {stack2, res2} = pop_while(stack, i, res)
        stack3 = [i | stack2]
        {res2, stack3}
      end)

    result2
  end

  defp pop_while([top | rest], i, res) when top < i do
    res2 = :array.set(top, i, res)
    pop_while(rest, i, res2)
  end

  defp pop_while(stack, _i, res), do: {stack, res}
end