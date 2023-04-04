export default async () => {
	const res = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/aggregation/getWordCloud`);
    return await res.json() as {
        _id: string;
        total: number;
    }[];
}