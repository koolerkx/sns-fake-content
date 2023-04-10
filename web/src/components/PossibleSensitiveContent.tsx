import { PieChart } from '@opd/g2plot-react';
import { Spin } from 'antd';
import { useQuery } from "react-query";
import getPercentagesOfPossibleSensitiveContent from "../api/getPercentagesOfPossibleSensitiveContent";

const PossibleSensitiveContentDistributionChart = () => {
  const { data, isLoading } = useQuery('getPercentagesOfPossibleSensitiveContent', getPercentagesOfPossibleSensitiveContent);

  if (isLoading) {
    return <Spin />
  }

  return (
    <PieChart angleField={"count"} colorField={"_id"} data={data || []} innerRadius={0.6} />
  );
};

export default PossibleSensitiveContentDistributionChart;
