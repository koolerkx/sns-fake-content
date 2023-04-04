import { Alert, Card } from "antd";
import { useQuery } from "react-query";
import getHistoryList from "../api/getHistoryList";

type AlertType = 'success' | 'info' | 'error' | 'warning';

const HistoryItem: React.FC<Awaited<ReturnType<typeof getHistoryList>>[number]> = (props) => {

    const option = ['success', 'error'][Math.floor((1 - props.score) * 2)] as AlertType;

    return (
        <Alert
            message={`Detection at ${props.createdAt.split('T').shift()}`}
            description={`The detected text "${props.text.substring(0, 40)}" has only ${(props.score * 100).toFixed(2)}% chance to be true`}
            type={option}
            showIcon
        />
    );
}

const HistoryList = () => {

    const { data, isError, error } = useQuery('getHistoryList', getHistoryList);

    return (
        <Card title="History">
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: '1rem',
            }}>
                {
                    isError && error instanceof Error ? (
                        <div>
                            error occurred: {error.message}
                        </div>
                    ) : data && data.map(e => (
                        <div>
                            <HistoryItem {...e} />
                        </div>
                    ))
                }
            </div>
        </Card>
    );
}

export default HistoryList;