class Solution:
    def maximumGap(self, nums: List[int]) -> int:
        n = len(nums)
        if n < 2:
            return 0

        mn, mx = min(nums), max(nums)
        if mn == mx:
            return 0

        size = max(1, (mx - mn) // (n - 1))
        count = (mx - mn) // size + 1

        bucket_min = [float('inf')] * count
        bucket_max = [float('-inf')] * count
        used = [False] * count

        for x in nums:
            i = (x - mn) // size
            bucket_min[i] = min(bucket_min[i], x)
            bucket_max[i] = max(bucket_max[i], x)
            used[i] = True

        ans = 0
        prev = mn
        for i in range(count):
            if not used[i]:
                continue
            ans = max(ans, bucket_min[i] - prev)
            prev = bucket_max[i]

        return ans