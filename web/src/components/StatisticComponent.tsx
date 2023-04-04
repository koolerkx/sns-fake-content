import { Card, Col, Row, Statistic } from "antd";
import { useQuery } from "react-query";
import getDatasetCount from "../api/getDatasetCount";
import getDetectionCount from "../api/getDetectionCount";

const StatisticComponent = () => {

  const { data: detectionCount } = useQuery('getDetectionCount', getDetectionCount);
  const { data: datasetCount } = useQuery('getDatasetCount', getDatasetCount);

  return (
    <Card title="Statistics">
      <Row>
        <Col span={12}>
          <Statistic title="Detection Count" value={detectionCount} />
        </Col>

        <Col span={12}>
          <Statistic title="Dataset Count" value={datasetCount} />
        </Col>
      </Row>
    </Card>
  );
};

export default StatisticComponent;
