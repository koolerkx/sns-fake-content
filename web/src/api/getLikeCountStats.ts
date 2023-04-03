export default async () => {
	const res = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/aggregation/getLikeCountStats`);
    return await res.json() as {
        describe: string;
        label: string;
        like_count: number;
    }[];
}
