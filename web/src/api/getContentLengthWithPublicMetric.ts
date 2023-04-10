export default async () => {
	const res = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/aggregation/getContentLengthWithPublicMetric`);
    return await res.json() as {
      processed_text_length: number;
      label: "true" | "false";
      like_count: number;
      quote_count: number;
      reply_count: number;
      retweet_count: number;
    }[];
}