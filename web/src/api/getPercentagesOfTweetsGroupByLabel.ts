export default async () => {
	const res = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/aggregation/getPercentagesOfTweetsGroupByLabel`);
    return await res.json();
}