import { Card, Col, Divider, Row, Typography } from "antd";
import { useQuery } from "react-query";
import {  WordCloudChart } from "@opd/g2plot-react";
import getWordCloud from "../api/getWordCloud";
import { DescriptionLengthWithPublicMetricScatterPlot } from "../components/DescriptionLengthWithPublicMetricScatterPlot";
import { UserCreatedCountThroughTime } from "../components/UserCreatedCountThroughTime";
import { Top10UserWordsBarChart } from "../components/Top10UserWordsBarChart";
import UserLabelComparisonChart from "../components/UserLabelComparsionChart";
import { DatasetStatisticalInfo } from "../components/DatasetStatisticalInfo";

const { Title } = Typography;

const DatasetUsersScreen = () => {

    const { data } = useQuery('getWordCloud', () => getWordCloud('user'));

    return (
        <div>
            <Title>Users dataset analysis</Title>

            <Divider />

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: '1rem',
            }}>
                <Row gutter={16}>
                    <Col sm={24} md={12} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        rowGap: '1rem',
                    }}>
                        <DatasetStatisticalInfo />

                        <Card title="Label Distribution">
                            <UserLabelComparisonChart />
                        </Card>

                        <Card title="Label Distribution through time">
                            <UserCreatedCountThroughTime />
                        </Card>
                    </Col>

                    <Col sm={24} md={12} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        rowGap: '1rem',
                    }}>
                        <Card title="Word Cloud">
                            <WordCloudChart
                                data={data || []}
                                wordField="processed_text"
                                weightField="count"
                                colorField="processed_text"
                            />
                        </Card>

                        <Card title="Top 10 Content Words">
                            <Top10UserWordsBarChart />
                        </Card>

                        <Card title="Content Length with Public Metrics">
                            <DescriptionLengthWithPublicMetricScatterPlot />
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default DatasetUsersScreen;
