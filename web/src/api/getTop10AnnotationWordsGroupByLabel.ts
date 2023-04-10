export default async (label: "true" | "false" | null = null) => {
	const res = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/aggregation/getTop10AnnotationWordsGroupByLabel?` + new URLSearchParams(label && {
        label: label ?? "",
    } || {}));
    return await res.json() as {
        label: string;
        processed_text: string;
        count: number;
        true_count: number;
        false_count: number;
    }[];
}
