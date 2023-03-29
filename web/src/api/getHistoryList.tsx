import History from "../types/History";

export default async () => {
    const res = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/history/getHistoryList`);

    if (!res.ok) {
        throw new Error('unknown network issue.');
    }

    const json = (await res.json() || []) as (History & { createdAt: string; updatedAt: string; })[];

    return json.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
};
