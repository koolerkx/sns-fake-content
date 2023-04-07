import { useNonpersistentDetectionOutputStore } from "./DetectionInput";
import { Alert } from 'antd';
import { useEffect, useMemo } from "react";

type AlertType = 'success' | 'info' | 'error' | 'warning';

const SimpleDetectionResultDisplay = () => {

    const { score, text } = useNonpersistentDetectionOutputStore();

    const type = useMemo(() => {
        return ['success', 'error'][Math.floor((1 - score) * 2)] as AlertType;
    }, [score]);

    if (!text) return <></>;

    return (
        <Alert
            type={type}
            message={`The creditability of this message is ${(score * 100).toFixed(2)}%.\n Hence It should be a ${score > .5} message.`}
        />
    );
}

export default SimpleDetectionResultDisplay;
