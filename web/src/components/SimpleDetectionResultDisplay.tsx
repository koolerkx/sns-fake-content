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
            message={
                <span>
                    The creditability of this message is <b>{(score * 100).toFixed(2)}%</b>.
                    Hence It should be a <b>{score > .5 ? "true" : "false"}</b> message.
                </span>
            }
        />
    );
}

export default SimpleDetectionResultDisplay;
