import { Spin } from "antd";
import { useQuery } from "react-query";
import { RoseChart } from "@opd/g2plot-react";
import getAnnotationTypes from "../api/getAnnotationTypes";


export const AnnotationTypesRoseChart = () => {

    const { data, isLoading } = useQuery('getAnnotationTypes', getAnnotationTypes);

    if (isLoading) {
        return (
            <Spin />
        );
    }

    return (
        <RoseChart
            data={data ?? []}
            xField="_id"
            yField="count"
            seriesField="_id" />
    );
};
