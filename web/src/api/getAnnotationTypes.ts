export default async (label: "true" | "false" | null = null) => {
	const res = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/aggregation/getAnnotationTypes?` + new URLSearchParams(label && {
    label: label ?? "",
  } || {}));
    return await res.json() as {
        _id: string;
        value: number;
    }[];
}
