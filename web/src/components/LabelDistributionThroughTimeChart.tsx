import { Spin } from "antd";
import { useQuery } from "react-query";
import { ColumnChart } from "@opd/g2plot-react";
import getLabelDistributionThroughTime from "../api/getLabelDistributionThroughTime";
import { useFiltering } from "../store/filtering";
import { useEffect } from "react";


export const LabelDistributionThroughTimeChart = () => {

    const { label } = useFiltering();

    const { data, isLoading, refetch } = useQuery('getLabelDistributionThroughTime', () => getLabelDistributionThroughTime(label));

    useEffect(() => {
        refetch();
    }, [label]);

    if (isLoading) {
        return (
            <Spin />
        );
    }

    return (
        <ColumnChart data={data ?? []} isPercent isStack seriesField="label" xField="created_at" yField="count" />
    );
};
