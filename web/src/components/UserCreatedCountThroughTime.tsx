import { Spin } from "antd";
import { useQuery } from "react-query";
import { ColumnChart } from "@opd/g2plot-react";
import getUserCreatedCountThroughTime from "../api/getUserCreatedCountThroughTime";

export const UserCreatedCountThroughTime = () => {

    const { data, isLoading } = useQuery('getUserCreatedCountThroughTime', getUserCreatedCountThroughTime);

    if (isLoading) {
        return (
            <Spin />
        );
    }

    return (
        <ColumnChart data={data ?? []} isPercent isStack seriesField="label" xField="created_at" yField="count" />
    );
};
