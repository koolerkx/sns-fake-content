import { Col, Divider, Row, Typography } from 'antd';
import HistoryList from '../components/HistoryList';
import DetectionInput from '../components/DetectionInput';
import DetectionTimeLine from '../components/DetectionTimeLine';
const { Title, Paragraph } = Typography;

const DetectionScreen = () => {
    return (
        <Row justify="space-between">
            <Col sm={24} md={14}>
                <Title>
                    Detection page
                </Title>

                <Paragraph>
                    Duis consectetur incididunt proident ad duis occaecat officia voluptate tempor consectetur incididunt dolor do. Esse ullamco occaecat dolore pariatur deserunt enim commodo nisi ipsum proident nostrud nisi esse. Cupidatat et nostrud sunt aliqua id minim Lorem cillum. Consectetur est enim ut deserunt incididunt anim amet aute sit proident elit enim reprehenderit nostrud. Qui sint esse sunt ad consectetur aute esse. Pariatur dolore reprehenderit sit tempor laborum.
                </Paragraph>

                <Paragraph>
                    Nisi esse est est qui laboris aliquip ullamco id. Voluptate mollit labore proident non enim amet consequat esse deserunt dolor fugiat anim. Excepteur velit reprehenderit ex ea et sint tempor. Non Lorem irure anim cillum eiusmod. Ad officia Lorem elit nulla anim consequat pariatur proident voluptate dolore et aute sit. Pariatur ullamco officia qui est qui Lorem laboris anim.
                </Paragraph>

                <Divider />

                <DetectionInput />

                <div style={{ marginTop: '2rem' }}>
                    <DetectionTimeLine />
                </div>
            </Col>
            <Col sm={24} md={9}>
                <HistoryList />
            </Col>
        </Row>
    );
}

export default DetectionScreen;