import { Card, Col, Divider, Row, Tabs, Typography } from "antd";
import { useQuery } from "react-query";
import { TreemapChart, WordCloudChart } from "@opd/g2plot-react";
import getWordCloud from "../api/getWordCloud";
import DatasetLabelComparisonChart from "../components/DatasetLabelComparisonChart";
import { DatasetStatisticalInfoForTweets } from "../components/DatasetStatisticalInfoForTweets";
import { useEffect, useState } from "react";
import { AnnotationTypesRoseChart } from "../components/AnnotationTypesRoseChart";
import { ContentLengthWithPublicMetricScatterPlotChart } from "../components/ContentLengthWithPublicMetricScatterPlotChart";
import { LabelDistributionThroughTimeChart } from "../components/LabelDistributionThroughTimeChart";
import { PublicMetric } from "../components/PublicMetric";
import { Top10ContentWordsBarChart } from "../components/Top10ContentWordsBarChart";
import { Top10AnnotationWordsBarChart } from "../components/Top10AnnotationWordsBarChart";

const { Title } = Typography;

const DatasetTweetsScreen = () => {

    const [ type, setType ] = useState('content');
    const { data, refetch } = useQuery('getWordCloud', () => getWordCloud(type));

    useEffect(() => {
        refetch();
    }, [type]);

    return (
        <div>
            <Title>Tweets dataset analysis</Title>

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
                        <DatasetStatisticalInfoForTweets />

                        <Card title="Label Distribution">
                            <DatasetLabelComparisonChart />
                        </Card>

                        <Card title="Label Distribution through time">
                            <LabelDistributionThroughTimeChart />
                        </Card>

                        <Card title="Public Metric">
                            <PublicMetric />
                        </Card>
                    </Col>

                    <Col sm={24} md={12} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        rowGap: '1rem',
                    }}>
                        <Card title="Word Cloud">
                            <Tabs
                                defaultActiveKey="1"
                                type="card"
                                onChange={(e) => setType(e)}
                                items={[
                                    { label: "Content" },
                                    { label: "Context Entity" },
                                    { label: "Context Domain" },
                                    { label: "Annotation" },
                                    { label: "HashTag" },
                                    { label: "CashTag" },
                                    { label: "URL" }
                                ].map((e, i) => ({ ...e, key: e.label.split(" ").pop()?.toLowerCase() || `Tab ${i}`, }))}
                            />

                            <WordCloudChart
                                data={data || []}
                                wordField="processed_text"
                                weightField="count"
                                colorField="processed_text"
                            />
                        </Card>

                        {['entity', 'domain', 'hashtag', 'cashtag', 'url'].includes(type) && 
                            <Card title={type === 'url' ? "Top 25 URL Host" : "Top 25 Content Word"}>
                                <TreemapChart
                                    data={{
                                        name: 'root',
                                        children: data?.map(e => ({ name: e.processed_text, value: e.count })).slice(0, 25) || []
                                    }}
                                    colorField="name"
                                />
                            </Card>
                        }
                        {['content'].includes(type) && (
                            <>
                                <Card title="Top 10 Content Words">
                                    <Top10ContentWordsBarChart />
                                </Card>

                                <Card title="Content Length with Public Metrics">
                                    <ContentLengthWithPublicMetricScatterPlotChart />
                                </Card>
                            </>
                        )}
                        {['annotation'].includes(type) && (
                            <>
                                <Card title="Annotation Types">
                                    <AnnotationTypesRoseChart />
                                </Card>

                                <Card title="Top 10 Annotation Words">
                                    <Top10AnnotationWordsBarChart />
                                </Card>
                            </>
                        )}
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default DatasetTweetsScreen;
