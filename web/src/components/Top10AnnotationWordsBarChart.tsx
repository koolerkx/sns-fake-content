import { Spin } from "antd";
import { useQuery } from "react-query";
import getTop10AnnotationWordsGroupByLabel from "../api/getTop10AnnotationWordsGroupByLabel";
import { Top10WordsBarChart } from "./Top10WordsBarChart";

export const Top10AnnotationWordsBarChart = () => {
    const { data, isLoading } = useQuery('getTop10AnnotationWordsGroupByLabel', getTop10AnnotationWordsGroupByLabel);

    if (isLoading) {
        return (
            <Spin />
        );
    }

    return (
        <Top10WordsBarChart data={data ?? []} />
    );
};
