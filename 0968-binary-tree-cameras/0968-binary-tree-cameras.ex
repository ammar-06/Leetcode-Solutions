defmodule Solution do
  @spec min_camera_cover(root :: TreeNode.t() | nil) :: integer
  def min_camera_cover(root) do
    {status, count} = dfs(root)

    if status == 0 do
      count + 1
    else
      count
    end
  end

  # status: 0 = not covered, 1 = covered no camera, 2 = has camera
  defp dfs(nil), do: {1, 0}

  defp dfs(%TreeNode{left: left, right: right}) do
    {ls, lc} = dfs(left)
    {rs, rc} = dfs(right)
    total = lc + rc

    cond do
      ls == 0 or rs == 0 -> {2, total + 1}
      ls == 2 or rs == 2 -> {1, total}
      true -> {0, total}
    end
  end
end