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

      <Divider />

      <Row justify="space-between" gutter={16}>
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

        <Col sm={24} md={12}>
          <Card title="Text Detection">

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              rowGap: '1rem'
            }}>
              <DetectionInput />

              <div>
                <Link to="/detect">Goto detection page for more flexible and versatile options.</Link>
              </div>

              <SimpleDetectionResultDisplay />

              <PieChart angleField={"count"} colorField={"_id"} data={test} />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default HomeScreen;
