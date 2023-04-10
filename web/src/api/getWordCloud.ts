export default async (type: string = 'content') => {
	const res = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/aggregation/getWordCloud?` + new URLSearchParams({ type }));
    return await res.json() as {
        processed_text: string;
        count: number;
    }[];
}