import { Card, Divider, Typography } from "antd";
import { useQuery } from "react-query";
import getHistoryList from "../api/getHistoryList";
const { Title, Paragraph } = Typography;

const HistoryItem: React.FC<Awaited<ReturnType<typeof getHistoryList>>[number]> = (props) => {
    return (
        <Card size="small" title={`Detection result of ${props.createdAt}`} style={{ width: '50%', minWidth: 300 }}>
            <div>
                detected by the model: {props.type}
            </div>

            <div style={{
                paddingLeft: '.5rem',
                borderLeft: `.25rem solid hsl(${props.score < .5 ? 0 : 120}, 50%, 90%)`,
                color: 'grey',
            }}>
                {props.text}
            </div>

            <div>
                creditability: {(props.score * 100).toFixed(2)}%
            </div>
        </Card>
    );
}

const HistoryList = () => {

    const { data, isError, error } = useQuery('getHistoryList', getHistoryList);

    return (
        <>
            <Title>
                History
            </Title>

            <Paragraph>
                Laboris esse quis amet culpa et occaecat culpa. Minim esse tempor elit cillum aliqua anim Lorem eiusmod id in et. Voluptate labore occaecat cillum ea. Ullamco laborum deserunt laborum pariatur voluptate veniam enim cupidatat irure tempor anim esse. Minim duis aliquip officia ad pariatur voluptate mollit laboris et. Sint non elit tempor ut est proident nostrud. Ut nostrud pariatur do ipsum ullamco fugiat.
            </Paragraph>

            <Divider />

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
        </>
    );
}

export default HistoryList;