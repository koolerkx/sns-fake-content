import axios from 'axios';
import ResponseModal, { isResponseModal } from './model/ResponseModal';
// const getAPI = (route: string) => new Url()

const getDetectionBy = async (route: string[], text: string): Promise<ResponseModal> => {
    const location = `${process.env.MODEL_SERVER_ENDPOINT}/detect/${route.join('/')}`;
    // build a url
    const url = new URL(location);
    // append text as a param
    url.searchParams.append('text', text);
    // send the request to the model server
    try {
        const ret = (await axios.get(url.toString())).data;

        if (!isResponseModal(ret)) {
            throw new Error(`Invalid response from ${location}.`);
        }

        return ret;
    } catch(e) {
        console.error(e);
        return null as any;
    }
}

export const getDetectionByTFIDFSVM = (text: string) => getDetectionBy(['tfidf', 'svm'], text);
export const getDetectionByTFIDFNB = (text: string) => getDetectionBy(['tfidf', 'nb'], text);
export const getDetectionByTFIDFRF = (text: string) => getDetectionBy(['tfidf', 'rf'], text);
export const getDetectionByTFIDFCNN = (text: string) => getDetectionBy(['tfidf', 'cnn'], text);
export const getDetectionByTFIDFRNN = (text: string) => getDetectionBy(['tfidf', 'rnn'], text);
export const getDetectionByWord2VecSVM = (text: string) => getDetectionBy(['word2vec', 'svm'], text);
export const getDetectionByWord2VecRF = (text: string) => getDetectionBy(['word2vec', 'rf'], text);
export const getDetectionByWord2VecCNN = (text: string) => getDetectionBy(['word2vec', 'cnn'], text);
export const getDetectionByWord2VecRNN = (text: string) => getDetectionBy(['word2vec', 'rnn'], text);
export const getDetectionByBERT = (text: string) => getDetectionBy(['bert'], text);
export const getDetectionByXLNet = (text: string) => getDetectionBy(['xlnet'], text);
