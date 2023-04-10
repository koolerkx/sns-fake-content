import { Spin } from "antd";
import { useEffect } from "react";
import { useQuery } from "react-query";
import getTop10ContentWordsGroupByLabel from "../api/getTop10ContentWordsGroupByLabel";
import { useFiltering } from "../store/filtering";
import { Top10WordsBarChart } from "./Top10WordsBarChart";

export const Top10ContentWordsBarChart = () => {

    const { label } = useFiltering();
    const { data, isLoading, refetch } = useQuery('getTop10ContentWordsGroupByLabel', () => getTop10ContentWordsGroupByLabel(label));

    useEffect(() => {
        refetch();
    }, []);

    if (isLoading) {
        return (
            <Spin />
        );
    }

    return (
        <Top10WordsBarChart data={data ?? []} />
    );
};
