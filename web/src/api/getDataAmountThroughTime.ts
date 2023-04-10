export default async () => {
	const res = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/aggregation/getDataAmountThroughTime`);
    return await res.json() as {
        label: "true" | "false",
        created_at: number,
        count: number;
    }[];
}