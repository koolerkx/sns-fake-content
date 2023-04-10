
import { PieChart } from '@opd/g2plot-react';
import { Spin } from 'antd';
import { useQuery } from "react-query";
import getPercentagesOfUsersGroupByLabel from '../api/getPercentagesOfUsersGroupByLabel';

const UserLabelComparisonChart = () => {
  const { data, isLoading } = useQuery('getPercentagesOfUsersGroupByLabel', getPercentagesOfUsersGroupByLabel);

  if (isLoading) {
    return <Spin />
  }

  return (
    <PieChart angleField={"count"} colorField={"_id"} data={data?.map(e => ({...e, _id: e._id + '' })) || []} innerRadius={0.6} />
  );
};

export default UserLabelComparisonChart;