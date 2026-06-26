class Solution {
    public int countPrimeSetBits(int left, int right) {
        int[] primes = new int[32];
        primes[2] = primes[3] = primes[5] = primes[7] = primes[11] = primes[13] = primes[17] = primes[19] = primes[23] = primes[29] = 1;

        int count = 0;
        for (int i = left; i <= right; i++) {
            int x = i;
            int bits = 0;
            while (x > 0) {
                bits += (x & 1);
                x >>= 1;
            }
            if (primes[bits] == 1) count++;
        }
        return count;
    }
}