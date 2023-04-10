import { PieChart } from '@opd/g2plot-react';
import { Spin } from 'antd';
import { useQuery } from "react-query";
import getPercentagesOfTweetsGroupByLabel from "../api/getPercentagesOfTweetsGroupByLabel";

const DatasetLabelComparisonChart = () => {
  const { data, isLoading } = useQuery('getPercentagesOfTweetsGroupByLabel', getPercentagesOfTweetsGroupByLabel);

  if (isLoading) {
    return <Spin />
  }

  return (
    <PieChart angleField={"count"} colorField={"_id"} data={data} innerRadius={0.6} />
  );
};

export default DatasetLabelComparisonChart;