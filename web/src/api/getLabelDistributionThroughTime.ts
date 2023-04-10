export default async (label: "true" | "false" | null = null) => {
	const res = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/aggregation/getLabelDistributionThroughTime?` + new URLSearchParams(label && {
    label: label ?? "",
  } || {}));
    return await res.json() as {
        label: string,
        created_at: number,
        count: number,
    }[];
}