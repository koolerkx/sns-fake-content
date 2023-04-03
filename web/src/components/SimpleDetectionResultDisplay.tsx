import { useNonpersistentDetectionOutputStore } from "./DetectionInput";
import { Alert } from 'antd';
import { useEffect, useMemo } from "react";

type AlertType = 'success' | 'info' | 'error' | 'warning';

const SimpleDetectionResultDisplay = () => {

    const { score, text } = useNonpersistentDetectionOutputStore();

    const type = useMemo(() => {
        return ['success', 'info', 'warning', 'error'][Math.floor((1 - score) * 4)] as AlertType;
    }, [score]);

    useEffect(() => {
        console.log(text);
    }, [text]);

    if (!text) return <></>;

    return (
        <Alert
            type={type}
            message={`the creditability of this message is ${(score * 100).toFixed(2)}% to be true.`}
        />
    );
}

export default SimpleDetectionResultDisplay;
