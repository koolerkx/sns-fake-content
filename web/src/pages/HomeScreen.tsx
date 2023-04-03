import { Card, Col, Divider, Row, Typography } from "antd";
import { WordCloudChart, PieChart } from '@opd/g2plot-react';
import { useRef } from "react";
import { useQuery } from "react-query";
import getWordCloud from "../api/getWordCloud";
import getPercentagesOfTweetsGroupByLabel from "../api/getPercentagesOfTweetsGroupByLabel";
import DetectionInput from "../components/DetectionInput";
import SimpleDetectionResultDisplay from "../components/SimpleDetectionResultDisplay";
import { Link } from "react-router-dom";
import StatisticComponent from "../components/StatisticComponent";
const { Title, Paragraph } = Typography;

const HomeScreen = (): React.ReactElement => {

  const ref = useRef<any>();

  const { data } = useQuery('getWordCloud', getWordCloud);
  const { data: test } = useQuery('getPercentagesOfTweetsGroupByLabel', getPercentagesOfTweetsGroupByLabel);

  return (
    <div>
      <Title>
        Home page
      </Title>

      <Paragraph>
        Duis consectetur incididunt proident ad duis occaecat officia voluptate tempor consectetur incididunt dolor do. Esse ullamco occaecat dolore pariatur deserunt enim commodo nisi ipsum proident nostrud nisi esse. Cupidatat et nostrud sunt aliqua id minim Lorem cillum. Consectetur est enim ut deserunt incididunt anim amet aute sit proident elit enim reprehenderit nostrud. Qui sint esse sunt ad consectetur aute esse. Pariatur dolore reprehenderit sit tempor laborum.
      </Paragraph>

      <Paragraph>
        Nisi esse est est qui laboris aliquip ullamco id. Voluptate mollit labore proident non enim amet consequat esse deserunt dolor fugiat anim. Excepteur velit reprehenderit ex ea et sint tempor. Non Lorem irure anim cillum eiusmod. Ad officia Lorem elit nulla anim consequat pariatur proident voluptate dolore et aute sit. Pariatur ullamco officia qui est qui Lorem laboris anim.
      </Paragraph>

      <Divider />

      <Row justify="space-between">
        <Col sm={24} md={12}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '1rem',
          }}>
            <div>
              <StatisticComponent />
            </div>

            <div>
              <Card title="Word Cloud">
                <WordCloudChart
                  chartRef={ref}
                  data={data || []}
                  wordField="_id"
                  weightField="total"
                  colorField="_id"
                />
              </Card>
            </div>
          </div>
        </Col>

        <Col sm={24} md={11}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '1rem'
          }}>
            <Card title="Text Detection">
              <DetectionInput />

              <div style={{ marginTop: '1rem' }}>
                <Link to="/detect">Goto detection page for more flexible and versatile options.</Link>
              </div>
            </Card>

            <SimpleDetectionResultDisplay />

            <PieChart angleField={"count"} colorField={"_id"} data={test} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default HomeScreen;
