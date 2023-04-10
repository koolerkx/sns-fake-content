import { Spin } from "antd";
import { useQuery } from "react-query";
import { RoseChart } from "@opd/g2plot-react";
import getAnnotationTypes from "../api/getAnnotationTypes";
import { useFiltering } from "../store/filtering";
import { useEffect } from "react";


export const AnnotationTypesRoseChart = () => {

    const { label } = useFiltering();
    const { data, isLoading, refetch } = useQuery('getAnnotationTypes', () => getAnnotationTypes(label));

    useEffect(() => {
        refetch();
    }, [label]);

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
