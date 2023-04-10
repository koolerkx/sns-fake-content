import { Card, Col, Row, Spin, Statistic } from "antd";
import { useQuery } from "react-query";
import { useEffect } from "react";
import getDatasetStatistics from "../api/getDatasetStatistics";

export const DatasetStatisticalInfo = () => {

    const { data, isLoading } = useQuery('getDatasetStatistics', getDatasetStatistics);

    useEffect(() => {
        console.log(data);
    }, [data]);

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
                    <Statistic title="Total Users Record" value={data?.usersCount} />
                </Col>
                <Col span={6}>
                    <Statistic title="Hashtag Unique Count" value={data?.uniqueHashtags} />
                </Col>
                <Col span={6}>
                    <Statistic title="Context Unique Count" value={data?.uniqueContexts} />
                </Col>
            </Row>
        </Card>
    );
};
