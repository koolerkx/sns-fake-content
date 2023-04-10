export default async () => {
	const res = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/aggregation/getTweetsStatistic`);
    return await res.json() as {
        id?: string
        like_count_mean?: number
        like_count_q0?: number
        like_count_q1?: number
        like_count_q2?: number
        like_count_q3?: number
        like_count_q4?: number
        like_count_std?: number
        like_count_var?: number
        quote_count_mean?: number
        quote_count_q0?: number
        quote_count_q1?: number
        quote_count_q2?: number
        quote_count_q3?: number
        quote_count_q4?: number
        quote_count_std?: number
        quote_count_var?: number
        reply_count_mean?: number
        reply_count_q0?: number
        reply_count_q1?: number
        reply_count_q2?: number
        reply_count_q3?: number
        reply_count_q4?: number
        reply_count_std?: number
        reply_count_var?: number
        retweet_count_mean?: number
        retweet_count_q0?: number
        retweet_count_q1?: number
        retweet_count_q2?: number
        retweet_count_q3?: number
        retweet_count_q4?: number
        retweet_count_std?: number
        retweet_count_var?: number
    };
}
