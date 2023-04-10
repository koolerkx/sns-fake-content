import { Spin } from "antd";
import { useQuery } from "react-query";
import getTop10ContentWordsGroupByLabel from "../api/getTop10ContentWordsGroupByLabel";
import { Top10WordsBarChart } from "./Top10WordsBarChart";

export const Top10ContentWordsBarChart = () => {
    const { data, isLoading } = useQuery('getTop10ContentWordsGroupByLabel', getTop10ContentWordsGroupByLabel);

    if (isLoading) {
        return (
            <Spin />
        );
    }

    return (
        <Top10WordsBarChart data={data ?? []} />
    );
};
