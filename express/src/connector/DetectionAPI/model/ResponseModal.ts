type ResponseModal = {
    result: boolean;
    data: number;
}

// simple response type
export default ResponseModal;

// guard function
export const isResponseModal = (e: unknown): e is ResponseModal => {
    if (!(e instanceof Object)) {
        return false;
    }

    if (e.hasOwnProperty('result') && e.hasOwnProperty('data')) {
        return true;
    }

    return false;
}
