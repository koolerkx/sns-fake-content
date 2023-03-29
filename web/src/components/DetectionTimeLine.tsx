import { Timeline } from "antd";
import { useQuery } from "react-query";
import getHistoryList from "../api/getHistoryList";

const DetectionTimeLine = () => {
    const { data, isLoading, isError, error } = useQuery('getHistoryList', getHistoryList);

    if (isLoading) {
        return (
            <div>
                loading...
            </div>
        );
    }

    if (isError) {
        const message = (error as Error).message;

        return (
            <div>
                error: {message}
            </div>
        );
    }

    return (
        <Timeline items={
            (data || [])
                .map((e, i) => ({
                    children: `detected at: ${e.createdAt.split('T').shift()}, with the creditability of: ${(e.score * 100).toFixed(2)}` 
                }))
        } />
    );
}

export default DetectionTimeLine;
