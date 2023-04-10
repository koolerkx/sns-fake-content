import { BarChart } from "@opd/g2plot-react";
import getTop10ContentWordsGroupByLabel from "../api/getTop10ContentWordsGroupByLabel";
import getTop10AnnotationWordsGroupByLabel from "../api/getTop10AnnotationWordsGroupByLabel";

export const Top10WordsBarChart = (props: {
    data: Awaited<ReturnType<typeof getTop10ContentWordsGroupByLabel & typeof getTop10AnnotationWordsGroupByLabel>>;
}) => {
    const data = props.data.reduce((a, b) => {
        const test = [...a, {
            label: 'true',
            processed_text: b.processed_text,
            count: b.true_count,
        }, {
            label: 'false',
            processed_text: b.processed_text,
            count: b.false_count,
        }];
        return test;
    }, [] as { label: string; processed_text: string; count: number; }[]);

    return (
        <BarChart
            data={data}
            xField="count"
            yField="processed_text"
            seriesField="label"
            isStack />
    );
};
