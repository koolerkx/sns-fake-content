export default async () => {
	const res = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/aggregation/getLabelDistributionThroughTime`);
    return await res.json() as {
        label: string,
        created_at: number,
        count: number,
    }[];
}