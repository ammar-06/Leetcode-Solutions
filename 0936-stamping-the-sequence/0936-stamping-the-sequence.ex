defmodule Solution do
  @spec moves_to_stamp(stamp :: String.t(), target :: String.t()) :: [integer]
  def moves_to_stamp(stamp, target) do
    stamp_c = String.to_charlist(stamp)
    slen = length(stamp_c)
    target_c = String.to_charlist(target)
    tlen = length(target_c)

    t_arr = :array.from_list(target_c)
    visited = :array.new(tlen, default: false)

    do_stamp(stamp_c, slen, tlen, t_arr, visited, [], 0)
  end

  defp do_stamp(stamp_c, slen, tlen, t_arr, visited, acc, stamped_count) do
    case scan(0, tlen - slen, stamp_c, slen, t_arr, visited) do
      {:ok, i, t_arr2, visited2, newly} ->
        do_stamp(stamp_c, slen, tlen, t_arr2, visited2, [i | acc], stamped_count + newly)

      :none ->
        if stamped_count == tlen do
          acc
        else
          []
        end
    end
  end

  defp scan(i, max_i, _stamp_c, _slen, _t_arr, _visited) when i > max_i do
    :none
  end

  defp scan(i, max_i, stamp_c, slen, t_arr, visited) do
    if :array.get(i, visited) == true do
      scan(i + 1, max_i, stamp_c, slen, t_arr, visited)
    else
      case check_window(stamp_c, 0, i, t_arr, false) do
        :fail ->
          scan(i + 1, max_i, stamp_c, slen, t_arr, visited)

        {:ok, matched_any} ->
          if matched_any do
            {t_arr2, newly} = blank_window(stamp_c, 0, i, t_arr, 0)
            visited2 = :array.set(i, true, visited)
            {:ok, i, t_arr2, visited2, newly}
          else
            scan(i + 1, max_i, stamp_c, slen, t_arr, visited)
          end
      end
    end
  end

  defp check_window([], _j, _offset, _t_arr, matched_any), do: {:ok, matched_any}

  defp check_window([sc | rest], j, offset, t_arr, matched_any) do
    tc = :array.get(offset + j, t_arr)

    cond do
      tc == ?? -> check_window(rest, j + 1, offset, t_arr, matched_any)
      tc == sc -> check_window(rest, j + 1, offset, t_arr, true)
      true -> :fail
    end
  end

  defp blank_window([], _j, _offset, t_arr, newly), do: {t_arr, newly}

  defp blank_window([_sc | rest], j, offset, t_arr, newly) do
    idx = offset + j

    if :array.get(idx, t_arr) == ?? do
      blank_window(rest, j + 1, offset, t_arr, newly)
    else
      t_arr2 = :array.set(idx, ??, t_arr)
      blank_window(rest, j + 1, offset, t_arr2, newly + 1)
    end
  end
end