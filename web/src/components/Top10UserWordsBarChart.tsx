import { Spin } from "antd";
import { useQuery } from "react-query";
import getTop10UserWordsGroupByLabel from "../api/getTop10UserWordsGroupByLabel";
import { Top10WordsBarChart } from "./Top10WordsBarChart";

export const Top10UserWordsBarChart = () => {
    const { data, isLoading } = useQuery('getTop10UserWordsGroupByLabel', getTop10UserWordsGroupByLabel);

    if (isLoading) {
        return (
            <Spin />
        );
    }

    return (
        <Top10WordsBarChart data={data ?? []} />
    );
};