import { LineChart } from "@opd/g2plot-react";
import { Card, Col, Divider, Row, Typography } from "antd";
import { useQuery } from "react-query";
const { Title } = Typography;
import { TreemapChart, WordCloudChart } from "@opd/g2plot-react";
import getWordCloud from "../api/getWordCloud";
import { useRef } from "react";

const fetchFake = async () => {
    const res = await fetch('https://gw.alipayobjects.com/os/bmw-prod/55424a73-7cb8-4f79-b60d-3ab627ac5698.json');
    const proc = (await res.json()) as { year: string; value: number; category: string; }[];
    return proc
        .filter(e => ['Solid fuel', 'Cement production'].includes(e.category))
        .map(e=> ({
            ...e,
            category: e.category === 'Solid fuel' ? 'true' : 'false',
        }));
}

const DatasetInfoScreen = () => {

    // const { data } = useQuery('getPercentagesOfTweetsGroupByLabel', getPercentagesOfTweetsGroupByLabel);
    const { data } = useQuery('fetchFake', fetchFake);

    const wordCloudRef = useRef<any>();
    const treemapRef = useRef<any>();
    const { data: wordCloudData } = useQuery('getWordCloud', getWordCloud);

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
                        <Card title="Word Cloud">
                            <WordCloudChart
                                chartRef={wordCloudRef}
                                data={wordCloudData || []}
                                wordField="_id"
                                weightField="total"
                                colorField="_id"
                            />
                        </Card>

                        <Card title="time series based label growth">
                            <LineChart
                                data={data || []}
                                xField="year"
                                yField="value"
                                seriesField="category"
                                xAxis={{
                                    type: 'time',
                                }}
                            />
                        </Card>
                    </div>
                </Col>

                <Col sm={24} md={12}>
                    <Card title="Tree map">
                        <TreemapChart
                            chartRef={treemapRef}
                            data={{
                                name: 'root',
                                children: wordCloudData?.map(e => ({ name: e._id, value: e.total })) || []
                            }}
                            colorField="name"
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default DatasetInfoScreen;
