export default async () => {
	const res = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/aggregation/getDatasetStatistics`);
    return (await res.json()) as {
        tweetsCount: number;
        usersCount: number;
        uniqueHashtags: number;
        uniqueContexts: number;
        totalWords: number;
    };
}