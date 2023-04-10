import { Card, Col, Row, Spin, Statistic } from "antd";
import { useQuery } from "react-query";
import getDatasetStatistics from "../api/getDatasetStatistics";

export const DatasetStatisticalInfoForTweets = () => {

    const { data, isLoading } = useQuery('getDatasetStatistics', getDatasetStatistics);

    if (isLoading) {
        return (
            <Card title="Dataset Statistic">
                <Spin />
            </Card>
        );
    }

    return (
        <Card title="Dataset Statistic">
            <Row>
                <Col span={6}>
                    <Statistic title="Total Tweets Record" value={data?.tweetsCount} />
                </Col>
                <Col span={6}>
                    <Statistic title="Total Words" value={data?.totalWords} />
                </Col>
            </Row>
        </Card>
    );
};
