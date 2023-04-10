import { Select, Spin } from "antd";
import { useQuery } from "react-query";
import { ScatterChart } from "@opd/g2plot-react";
import { useState } from "react";
import getDescriptionLengthWithPublicMetric from "../api/getDescriptionLengthWithPublicMetric";

export const DescriptionLengthWithPublicMetricScatterPlot = () => {

    const { data, isLoading } = useQuery('getDescriptionLengthWithPublicMetric', getDescriptionLengthWithPublicMetric);
    const [xField, setXField] = useState('following_count');

    if (isLoading) {
        return (
            <Spin />
        );
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '1rem',
        }}>
            <Select
                defaultValue="like_count"
                options={[
                    { 'label': 'Following Count', 'value': 'following_count' },
                    { 'label': 'Followers count', 'value': 'followers_count' },
                    { 'label': 'Tweet count', 'value': 'tweet_count' },
                ]}
                onChange={(e) => setXField(e)} />

            <ScatterChart
                data={data?.map(e => ({ ...e, label: '' + (e.label ?? "true") })) || []}
                xField={xField}
                yField="processed_description_length"
                shape="circle"
                colorField="label" />
        </div>
    );
};
