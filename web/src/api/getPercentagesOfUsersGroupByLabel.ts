export default async () => {
	const res = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/aggregation/getPercentagesOfUsersGroupByLabel`);
    return await res.json() as {
        _id: boolean;
        count: number;
    }[];
}