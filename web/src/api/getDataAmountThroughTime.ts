export default async (label: "true" | "false" | null = null) => {
	const res = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/aggregation/getDataAmountThroughTime?` + new URLSearchParams(label && {
    label: label ?? "",
  } || {}));
    return await res.json() as {
        label: "true" | "false",
        created_at: number,
        count: number;
    }[];
}