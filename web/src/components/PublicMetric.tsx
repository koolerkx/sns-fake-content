import { Col, Row, Spin, Statistic } from "antd";
import { useQuery } from "react-query";
import { BoxChart } from "@opd/g2plot-react";
import { useEffect } from "react";
import getTweetsStatistic from "../api/getTweetsStatistic";


export const PublicMetric = () => {

    const { data, isLoading } = useQuery('getTweetsStatistic', getTweetsStatistic);

    useEffect(() => {
        console.log(data);
    }, [data]);

    if (isLoading) {
        return (
            <Spin />
        );
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '1rem',
        }}>
            <Row gutter={16}>
                <Col span={6}>
                    <Statistic title="Average Like Count" value={data?.like_count_mean?.toFixed(2)} />
                </Col>
                <Col span={6}>
                    <Statistic title="Average Retweet" value={data?.retweet_count_mean?.toFixed(2)} />
                </Col>
                <Col span={6}>
                    <Statistic title="Average Quote Count" value={data?.quote_count_mean?.toFixed(2)} />
                </Col>
                <Col span={6}>
                    <Statistic title="Average Reply Count" value={data?.reply_count_var?.toFixed(2)} />
                </Col>
            </Row>

            <BoxChart
                data={[
                    {
                        type: "Like",
                        q0: data?.like_count_q0,
                        q1: data?.like_count_q1,
                        q2: data?.like_count_q2,
                        q3: data?.like_count_q3,
                        q4: data?.like_count_q4,
                    },
                    {
                        type: "Retweet",
                        q0: data?.retweet_count_q0,
                        q1: data?.retweet_count_q1,
                        q2: data?.retweet_count_q2,
                        q3: data?.retweet_count_q3,
                        q4: data?.retweet_count_q4,
                    },
                    {
                        type: "Quote",
                        q0: data?.quote_count_q0,
                        q1: data?.quote_count_q1,
                        q2: data?.quote_count_q2,
                        q3: data?.quote_count_q3,
                        q4: data?.quote_count_q4,
                    },
                    {
                        type: "Reply",
                        q0: data?.reply_count_q0,
                        q1: data?.reply_count_q1,
                        q2: data?.reply_count_q2,
                        q3: data?.reply_count_q3,
                        q4: data?.reply_count_q4,
                    },
                ]}
                xField="type"
                yField={['q0', 'q1', 'q2', 'q3', 'q4']} />
        </div>
    );
};
