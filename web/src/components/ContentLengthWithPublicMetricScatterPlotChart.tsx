import { Select, Spin } from "antd";
import { useQuery } from "react-query";
import { ScatterChart } from "@opd/g2plot-react";
import { useState } from "react";
import getContentLengthWithPublicMetric from "../api/getContentLengthWithPublicMetric";

export const ContentLengthWithPublicMetricScatterPlotChart = () => {

    const { data, isLoading } = useQuery('getContentLengthWithPublicMetric', getContentLengthWithPublicMetric);
    const [xField, setXField] = useState('like_count');

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
                    { 'label': 'Like count', 'value': 'like_count' },
                    { 'label': 'Retweet count', 'value': 'retweet_count' },
                    { 'label': 'Reply count', 'value': 'reply_count' },
                    { 'label': 'Quote count', 'value': 'quote_count' },
                ]}
                onChange={(e) => setXField(e)} />

            <ScatterChart
                data={data || []}
                xField={xField}
                yField="processed_text_length"
                shape="circle"
                colorField="label" />
        </div>
    );
};
