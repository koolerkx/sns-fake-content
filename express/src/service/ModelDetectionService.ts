import { getDetectionByBERT, getDetectionByTFIDFCNN, getDetectionByTFIDFNB, getDetectionByTFIDFRF, getDetectionByTFIDFRNN, getDetectionByTFIDFSVM, getDetectionByWord2VecCNN, getDetectionByWord2VecRF, getDetectionByWord2VecRNN, getDetectionByWord2VecSVM, getDetectionByXLNet } from '../connector/DetectionAPI/DetectionAPI';
import ResponseModal from '../connector/DetectionAPI/model/ResponseModal';

type ReducingObject = {[k: string]: ReducingObject | ((text: string) => Promise<ResponseModal>)};

export class ModelDetectionService {
    convertTypeToModelNames(type: string) {
        const arr = type.split('-');

        const map = {
            tfidf: {
                svm: getDetectionByTFIDFSVM,
                nb: getDetectionByTFIDFNB,
                rf: getDetectionByTFIDFRF,
                cnn: getDetectionByTFIDFCNN,
                rnn: getDetectionByTFIDFRNN,
            },
            word2vec: {
                svm: getDetectionByWord2VecSVM,
                rf: getDetectionByWord2VecRF,
                cnn: getDetectionByWord2VecCNN,
                rnn: getDetectionByWord2VecRNN,
            },
            bert: getDetectionByBERT,
            xlnet: getDetectionByXLNet,
        };

        const delegate = arr.reduce((
            a: ReducingObject | ((text: string) => Promise<ResponseModal>) | null,
            b: string,
        ) => {
            if (a && typeof a === 'function') {
                return a;
            }
            if (a && typeof a === 'object' && a.hasOwnProperty(b)) {
                return a[b];
            }
            return null;
        }, map);

        return typeof delegate === 'function' ? delegate : null;
    }
}
