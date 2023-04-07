import { Card, Col, Divider, Row, Statistic, Typography } from "antd";
import { useQuery } from "react-query";
import getLikeCountStats from "../api/getLikeCountStats";
import getTop20FalseTags from "../api/getTop20FalseTags";
import getTop20TrueTags from "../api/getTop20TrueTags";
import { TreemapChart, PieChart, WordCloudChart } from "@opd/g2plot-react";
import getPercentagesOfTweetsGroupByLabel from "../api/getPercentagesOfTweetsGroupByLabel";
import getWordCloud from "../api/getWordCloud";

const { Title } = Typography;

const DatasetTweetsScreen = () => {

    const { data: likeCountStats } = useQuery('getLikeCountStats', getLikeCountStats);
    const { data: top20TrueTags } = useQuery('getTop20TrueTags', getTop20TrueTags);
    const { data: top20FalseTags } = useQuery('getTop20FalseTags', getTop20FalseTags);
    const { data: percentages } = useQuery('getPercentagesOfTweetsGroupByLabel', getPercentagesOfTweetsGroupByLabel);
    const { data: wordCloudData } = useQuery('getWordCloud', getWordCloud);

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
                    <Col sm={24} md={12}>
                        <Card title="Basic like count analysis of the tweets dataset">
                            <Row gutter={24}>
                                <Col sm={24} md={12}>
                                    <Statistic
                                        title="The count of all tweets"
                                        value={likeCountStats?.find(e => e.describe === 'count')?.like_count || '0'}
                                    />
                                </Col>
                                <Col sm={24} md={12}>
                                    <Statistic
                                        title="The mean of all tweets' likes count"
                                        value={likeCountStats?.find(e => e.describe === 'mean')?.like_count || '0'}
                                    />
                                </Col>
                                <Col sm={24} md={12}>
                                    <Statistic
                                        title="The medium of all tweets' likes count"
                                        value={likeCountStats?.find(e => e.describe === 'medium')?.like_count || '0'}
                                    />
                                </Col>
                                <Col sm={24} md={12}>
                                    <Statistic
                                        title="The standard deviation of all tweets' likes count"
                                        value={likeCountStats?.find(e => e.describe === 'std')?.like_count || '0'}
                                    />
                                </Col>
                                <Col sm={24} md={12}>
                                    <Statistic
                                        title="The maximum of all tweets' likes count"
                                        value={likeCountStats?.find(e => e.describe === 'max')?.like_count || '0'}
                                    />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col sm={24} md={12}>
                        <Card title="Word Cloud">
                            <WordCloudChart
                                data={wordCloudData || []}
                                wordField="_id"
                                weightField="total"
                                colorField="_id"
                            />
                        </Card>
                    </Col>

                    <Col sm={24} md={12}>
                        <Card title="The label distribution across the all tweets">
                            <PieChart angleField={"count"} colorField={"_id"} data={percentages} />
                        </Card>
                    </Col>

                    <Col sm={24} md={12} style={{ marginTop: '1rem' }}>
                        <Card title="Top 20 hashtags of true tweets">
                            <TreemapChart
                                data={{
                                    name: 'root',
                                    children: top20TrueTags?.map(e => ({ name: e.text, value: e.value })) || []
                                }}
                                colorField="name"
                            />
                        </Card>
                    </Col>

                    <Col sm={24} md={12} style={{ marginTop: '1rem' }}>
                        <Card title="Top 20 hashtags of fake tweets">
                            <TreemapChart
                                data={{
                                    name: 'root',
                                    children: top20FalseTags?.map(e => ({ name: e.text, value: e.value })) || []
                                }}
                                colorField="name"
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default DatasetTweetsScreen;
