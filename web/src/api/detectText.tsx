export default async (obj: { type: string; text: string; }) => {
	const res = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/detect`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(obj),
	});

	if (!res.ok) {
		throw new Error('unknown network issue.');
	}

	return {
		...await res.json() as {
			result: boolean;
			data: number;
		},
		...obj,
	};
};
