import { LineChart } from "@opd/g2plot-react";
import { Divider, Typography } from "antd";
import { useQuery } from "react-query";
const { Title, Paragraph } = Typography;

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

    return (
        <div>
            <Title>
                Dataset Info
            </Title>

            <Paragraph>
                Mollit occaecat cupidatat nisi dolore magna qui exercitation. In excepteur culpa laboris ex ea cupidatat minim pariatur cillum. Sit cillum ad nulla proident anim commodo. Eiusmod laborum exercitation cupidatat nisi labore proident. Magna sint aliquip enim nisi ut aute voluptate in aliquip nulla ut. Tempor anim anim culpa occaecat anim mollit commodo dolor elit esse quis ullamco. Tempor proident dolor et cupidatat mollit irure consequat excepteur ea voluptate.
            </Paragraph>

            <Paragraph>
                Labore nulla veniam excepteur minim nostrud aliqua laborum laborum. Eu officia Lorem velit enim velit proident anim labore mollit Lorem. Consequat exercitation minim ea veniam. Aliqua fugiat ad ex adipisicing quis ullamco velit id et fugiat proident anim anim cillum. Deserunt ea minim nostrud minim in eu esse sint incididunt.
            </Paragraph>

            <Divider />

            <LineChart
                data={data || []}
                xField="year"
                yField="value"
                seriesField="category"
                xAxis={{
                    type: 'time',
                }}
            />
        </div>
    );
}

export default DatasetInfoScreen;
