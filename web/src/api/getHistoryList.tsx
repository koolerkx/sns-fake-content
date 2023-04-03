import History from "../types/History";

export default async () => {
    const res = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/history/getHistoryList`);

    if (!res.ok) {
        throw new Error('unknown network issue.');
    }

    return (await res.json() || []) as (History & { createdAt: string; })[];
};
