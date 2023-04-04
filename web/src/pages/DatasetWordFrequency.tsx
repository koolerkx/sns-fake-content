import { TreemapChart, WordCloudChart } from "@opd/g2plot-react";
import { Card, Divider, Typography } from "antd";
import { useRef } from "react";
import { useQuery } from "react-query";
import getWordCloud from "../api/getWordCloud";
const { Title, Paragraph } = Typography;

const DatasetWordFrequency = () => {

    const wordCloudRef = useRef<any>();
    const treemapRef = useRef<any>();
    const { data } = useQuery('getWordCloud', getWordCloud);

    console.log(data?.map(e => ({ name: e._id, value: e.total })) || []);

    return (
        <div>
            <Title>
                Word Frequency
            </Title>

            <Paragraph>
                Velit reprehenderit exercitation pariatur aute irure. Id ad sunt quis aute pariatur labore dolore occaecat anim mollit ex magna mollit duis. Id qui aliquip ipsum ea eu eiusmod nisi eiusmod proident ut ad.
            </Paragraph>

            <Paragraph>
                Cupidatat et voluptate voluptate minim dolor amet mollit nulla tempor. Eiusmod eu proident labore Lorem minim ex excepteur officia culpa ullamco excepteur veniam duis. Commodo tempor minim amet magna sint Lorem et amet exercitation velit ad. Nulla irure qui et non velit magna tempor velit incididunt tempor culpa nisi. Eu ea tempor in enim eu irure ut ullamco. Elit eu pariatur pariatur veniam minim Lorem mollit nulla.
            </Paragraph>

            <Divider />

            <Card title="Word Cloud">
                <WordCloudChart
                    chartRef={wordCloudRef}
                    data={data || []}
                    wordField="_id"
                    weightField="total"
                    colorField="_id"
                />
            </Card>

            <Card title="Tree map">
                <TreemapChart
                    chartRef={treemapRef}
                    data={{
                        name: 'root',
                        children: data?.map(e => ({ name: e._id, value: e.total })) || []
                    }}
                    colorField="name"
                />
            </Card>
        </div>
    );
}

export default DatasetWordFrequency;
