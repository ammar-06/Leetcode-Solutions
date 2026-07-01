defmodule Solution do
  def three_equal_parts(arr) do
    ones = Enum.sum(arr)

    cond do
      ones == 0 ->
        [0, 2]

      rem(ones, 3) != 0 ->
        [-1, -1]

      true ->
        k = div(ones, 3)

        {i1, i2, i3} =
          arr
          |> Enum.with_index()
          |> Enum.reduce({0, nil, nil, nil}, fn {v, idx}, {c, a, b, d} ->
            if v == 1 do
              c = c + 1

              {
                c,
                if(c == 1, do: idx, else: a),
                if(c == k + 1, do: idx, else: b),
                if(c == 2 * k + 1, do: idx, else: d)
              }
            else
              {c, a, b, d}
            end
          end)
          |> then(fn {_, a, b, c} -> {a, b, c} end)

        len = length(arr)
        tail = len - i3

        if i1 + tail <= i2 and i2 + tail <= i3 do
          p1 = Enum.slice(arr, i1, tail)
          p2 = Enum.slice(arr, i2, tail)
          p3 = Enum.slice(arr, i3, tail)

          if p1 == p2 and p2 == p3 do
            [i1 + tail - 1, i2 + tail]
          else
            [-1, -1]
          end
        else
          [-1, -1]
        end
    end
  end
end