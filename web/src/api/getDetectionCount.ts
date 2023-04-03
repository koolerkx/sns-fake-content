export default async () => {
	const res = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/aggregation/getDetectionCount`);
    return (await res.json())['data'] as number;
}
