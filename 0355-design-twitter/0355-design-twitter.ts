class Twitter {
    private time: number;
    private tweets: Map<number, [number, number][]>;
    private follows: Map<number, Set<number>>;

    constructor() {
        this.time = 0;
        this.tweets = new Map();
        this.follows = new Map();
    }

    postTweet(userId: number, tweetId: number): void {
        if (!this.tweets.has(userId)) this.tweets.set(userId, []);
        this.tweets.get(userId)!.push([this.time++, tweetId]);
    }

    getNewsFeed(userId: number): number[] {
        const all: [number, number][] = [];

        if (this.tweets.has(userId)) {
            all.push(...this.tweets.get(userId)!);
        }

        if (this.follows.has(userId)) {
            for (const followee of this.follows.get(userId)!) {
                if (this.tweets.has(followee)) {
                    all.push(...this.tweets.get(followee)!);
                }
            }
        }

        all.sort((a, b) => b[0] - a[0]);

        const res: number[] = [];
        for (let i = 0; i < Math.min(10, all.length); i++) {
            res.push(all[i][1]);
        }

        return res;
    }

    follow(followerId: number, followeeId: number): void {
        if (!this.follows.has(followerId)) {
            this.follows.set(followerId, new Set());
        }
        this.follows.get(followerId)!.add(followeeId);
    }

    unfollow(followerId: number, followeeId: number): void {
        this.follows.get(followerId)?.delete(followeeId);
    }
}