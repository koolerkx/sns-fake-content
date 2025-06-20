import { Select, Spin } from "antd";
import { useQuery } from "react-query";
import { ScatterChart } from "@opd/g2plot-react";
import { useEffect, useState } from "react";
import getContentLengthWithPublicMetric from "../api/getContentLengthWithPublicMetric";
import { useFiltering } from "../store/filtering";

export const ContentLengthWithPublicMetricScatterPlotChart = () => {

    const store = useFiltering();

    const { data, isLoading, refetch } = useQuery('getContentLengthWithPublicMetric', () => getContentLengthWithPublicMetric(store.label));
    const [xField, setXField] = useState('like_count');

    useEffect(() => {
        refetch();
    }, [store.label]);

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
