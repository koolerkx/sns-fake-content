import { Card, Col, Divider, Row, Typography } from "antd";
import { WordCloudChart } from '@opd/g2plot-react';
import { useRef } from "react";
import { useQuery } from "react-query";
import getWordCloud from "../api/getWordCloud";
import DetectionInput from "../components/DetectionInput";
import SimpleDetectionResultDisplay from "../components/SimpleDetectionResultDisplay";
import { Link } from "react-router-dom";
import StatisticComponent from "../components/StatisticComponent";
import DatasetLabelComparisonChart from "../components/DatasetLabelComparisonChart";
const { Title } = Typography;

const HomeScreen = (): React.ReactElement => {

  const ref = useRef<any>();

  const { data } = useQuery('getWordCloud', () => getWordCloud());

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
                  wordField="processed_text"
                  weightField="count"
                  colorField="processed_text"
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
              </div>
            </Card>

            <Card title="Dataset Label">
              <DatasetLabelComparisonChart />
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default HomeScreen;
