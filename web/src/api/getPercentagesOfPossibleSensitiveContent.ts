export default async () => {
	const res = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/aggregation/getPercentagesOfPossibleSensitiveContent`);
    const json = (await res.json()) as { _id: boolean; count: number }[];
    return json.map(e => ({...e, _id: e._id ? "true" : "false" }));
}