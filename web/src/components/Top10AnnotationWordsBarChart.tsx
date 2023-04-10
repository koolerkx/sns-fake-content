import { Spin } from "antd";
import { useEffect } from "react";
import { useQuery } from "react-query";
import getTop10AnnotationWordsGroupByLabel from "../api/getTop10AnnotationWordsGroupByLabel";
import { useFiltering } from "../store/filtering";
import { Top10WordsBarChart } from "./Top10WordsBarChart";

export const Top10AnnotationWordsBarChart = () => {

    const { label } = useFiltering();
    const { data, isLoading, refetch } = useQuery('getTop10AnnotationWordsGroupByLabel', () => getTop10AnnotationWordsGroupByLabel(label));

    useEffect(() => {
        refetch();
    }, [label]);

    if (isLoading) {
        return (
            <Spin />
        );
    }

    return (
        <Top10WordsBarChart data={data ?? []} />
    );
};
