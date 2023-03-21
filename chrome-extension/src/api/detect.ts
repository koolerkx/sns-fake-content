type ResponseModal = {
    result: boolean;
    data: number;
};

export const detect = async (text: string) => {
    const raw = await chrome.storage.sync.get(['model-name', 'api-endpoint']);

    const endpoint: string = raw['api-endpoint'] || 'http://localhost:3000/v1/detect/';
    const type: string = raw['model-name'] || 'tfidf-svm';

    const response = await fetch(endpoint, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            type: type,
            text,
        }),
    });

    if (!response.ok) {
        throw new Error('unknown network problem.');
    }

    return {
        ...await response.json(),
        type,
    } as ResponseModal & { type: string };
}