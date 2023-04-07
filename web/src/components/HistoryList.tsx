import { Alert, Card, Spin } from "antd";
import { useQuery } from "react-query";
import getHistoryList from "../api/getHistoryList";

type AlertType = 'success' | 'info' | 'error' | 'warning';

const HistoryItem: React.FC<Awaited<ReturnType<typeof getHistoryList>>[number]> = (props) => {

    const option = ['success', 'error'][Math.floor((1 - props.score) * 2)] as AlertType;

    return (
        <Alert
            message={`Detection at ${props.createdAt.split('T').shift()}`}
            description={
                <span>
                    The creditability of the message <i>"{props.text.slice(0, 40)}{props.text.length > 40 && '...'}"</i> is <b>{(props.score * 100).toFixed(2)}%</b>.
                    Hence It should be a <b>{props.score > .5 ? "true" : "false"}</b> message.
                </span>
            }
            type={option}
            showIcon
        />
    );
}

const HistoryList = () => {

    const { data, isLoading, isError, error } = useQuery('getHistoryList', getHistoryList, { refetchOnWindowFocus: true });

    return (
        <Card title="History">
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: '1rem',
            }}>
                { isLoading && <Spin/> }
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