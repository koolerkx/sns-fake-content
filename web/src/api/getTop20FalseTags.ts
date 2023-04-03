export default async () => {
	const res = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/aggregation/getTop20FalseTags`);
    return await res.json() as {
        text: string;
        value: number;
    }[];
}
