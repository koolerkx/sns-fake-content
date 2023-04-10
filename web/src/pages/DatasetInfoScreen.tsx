import { LineChart } from "@opd/g2plot-react";
import { Card, Col, Divider, Row, Spin, Typography } from "antd";
import { useQuery } from "react-query";
const { Title } = Typography;
import { WordCloudChart } from "@opd/g2plot-react";
import getWordCloud from "../api/getWordCloud";
import { useEffect, useRef } from "react";
import PossibleSensitiveContentDistributionChart from "../components/PossibleSensitiveContent";
import DatasetLabelComparisonChart from "../components/DatasetLabelComparisonChart";
import { DatasetStatisticalInfo } from "../components/DatasetStatisticalInfo";
import getDataAmountThroughTime from "../api/getDataAmountThroughTime";

const DataAmountThroughTimeChart = () => {

    const { data, isLoading } = useQuery('getDataAmountThroughTime', getDataAmountThroughTime);

    useEffect(() => {
        console.log(data);
    }, [data]);

    if (isLoading) {
        return (
            <Spin />
        );
    }

    return (
        <LineChart
            data={data?.sort((a, b) => a.created_at - b.created_at)?.map(e => ({ ...e, created_at: ""+ e.created_at })) || []}
            xField="created_at"
            yField="count"
            seriesField="label"
            xAxis={{
                type: 'time',
            }}
        />
    );
}

const DatasetInfoScreen = () => {

    const wordCloudRef = useRef<any>();
    const { data: wordCloudData } = useQuery('getWordCloud', () => getWordCloud());

    return (
        <div>
            <Title>
                Dataset Inspection
            </Title>

            <Divider />

            <Row gutter={16}>
                <Col sm={24} md={12}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        rowGap: '1rem',
                    }}>
                        <DatasetStatisticalInfo />

                        <Card title="Label distribution">
                            <DatasetLabelComparisonChart />
                        </Card>

                        <Card title="Possible Distribution">
                            <PossibleSensitiveContentDistributionChart />
                        </Card>
                    </div>
                </Col>

                <Col sm={24} md={12}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        rowGap: '1rem',
                    }}>
                        <Card title="time series based label growth">
                            <Title style={{ marginTop: 0 }}>FakeNewsNet</Title>
                            <a href="https://github.comKaiDMML/FakeNewsNet">https://github.comKaiDMML/FakeNewsNet</a>
                        </Card>

                        <Card title="Data amount through time">
                            <DataAmountThroughTimeChart />
                        </Card>

                        <Card title="Word Cloud">
                            <WordCloudChart
                                chartRef={wordCloudRef}
                                data={wordCloudData || []}
                                wordField="processed_text"
                                weightField="count"
                                colorField="processed_text"
                            />
                        </Card>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default DatasetInfoScreen;
