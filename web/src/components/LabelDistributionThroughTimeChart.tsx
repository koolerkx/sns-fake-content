import { Spin } from "antd";
import { useQuery } from "react-query";
import { ColumnChart } from "@opd/g2plot-react";
import getLabelDistributionThroughTime from "../api/getLabelDistributionThroughTime";


export const LabelDistributionThroughTimeChart = () => {

    const { data, isLoading } = useQuery('getLabelDistributionThroughTime', getLabelDistributionThroughTime);

    if (isLoading) {
        return (
            <Spin />
        );
    }

    return (
        <ColumnChart data={data ?? []} isPercent isStack seriesField="label" xField="created_at" yField="count" />
    );
};
