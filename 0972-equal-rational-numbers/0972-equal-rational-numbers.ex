defmodule Solution do
  @spec is_rational_equal(s :: String.t(), t :: String.t()) :: boolean
  def is_rational_equal(s, t) do
    to_fraction(s) == to_fraction(t)
  end

  defp to_fraction(str) do
    case Regex.run(~r/^(\d+)(?:\.(\d*)(?:\((\d+)\))?)?$/, str) do
      [_, i] ->
        {String.to_integer(i), 1}
      [_, i, n] ->
        i_val = String.to_integer(i)
        if n == "" do
          {i_val, 1}
        else
          n_val = String.to_integer(n)
          den = pow(10, String.length(n))
          simplify(i_val * den + n_val, den)
        end
      [_, i, n, r] ->
        i_val = String.to_integer(i)
        n_len = String.length(n)
        n_val = if n == "", do: 0, else: String.to_integer(n)
        r_len = String.length(r)
        r_val = String.to_integer(r)

        den2 = pow(10, n_len) * (pow(10, r_len) - 1)
        num = i_val * den2 + n_val * (pow(10, r_len) - 1) + r_val
        simplify(num, den2)
    end
  end

  defp simplify(0, _den), do: {0, 1}
  defp simplify(num, den) do
    g = gcd(num, den)
    {div(num, g), div(den, g)}
  end

  defp gcd(a, 0), do: a
  defp gcd(a, b), do: gcd(b, rem(a, b))

  defp pow(_base, 0), do: 1
  defp pow(base, exp), do: base * pow(base, exp - 1)
end