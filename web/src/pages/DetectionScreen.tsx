import { Card, Col, Divider, Row, Typography } from 'antd';
import HistoryList from '../components/HistoryList';
import DetectionInput from '../components/DetectionInput';
import SimpleDetectionResultDisplay from '../components/SimpleDetectionResultDisplay';
const { Title, Paragraph } = Typography;

const DetectionScreen = () => {
    return (
        <Row justify="space-between" gutter={12}>
            <Col sm={24} md={14}>
                <Title>
                    Detection Panel
                </Title>

                <Divider />

                <Card title="Text detection">
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        rowGap: '1rem'
                    }}>
                        <DetectionInput showModelList />

                        <SimpleDetectionResultDisplay />
                    </div>

                </Card>

            </Col>
            <Col sm={24} md={10}>
                <HistoryList />
            </Col>
        </Row>
    );
}

export default DetectionScreen;