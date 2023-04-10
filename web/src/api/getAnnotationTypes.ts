export default async () => {
	const res = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/aggregation/getAnnotationTypes`);
    return await res.json() as {
        _id: string;
        value: number;
    }[];
}
