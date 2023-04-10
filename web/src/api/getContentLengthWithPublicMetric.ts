export default async (label: "true" | "false" | null = null) => {
	const res = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/aggregation/getContentLengthWithPublicMetric?` + new URLSearchParams(label && {
    label: label ?? "",
  } || {}));

  return await res.json() as {
    processed_text_length: number;
    label: "true" | "false";
    like_count: number;
    quote_count: number;
    reply_count: number;
    retweet_count: number;
  }[];
}