export default async () => {
	const res = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/aggregation/getDescriptionLengthWithPublicMetric`);
    return await res.json() as {
      processed_description_length: number;
      label: "true" | "false";
      following_count: number;
      followers_count: number;
      tweet_count: number;
    }[];
}