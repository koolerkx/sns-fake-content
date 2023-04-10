export default async () => {
	const res = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/aggregation/getTop10UserWordsGroupByLabel`);
    return await res.json() as {
        label: string;
        processed_text: string;
        count: number;
        true_count: number;
        false_count: number;
    }[];
}
