import { PieOptions, Plot } from '@antv/g2plot';
import { PieChart } from '@opd/g2plot-react';
import { Spin } from 'antd';
import {  useRef } from 'react';
import { useQuery } from "react-query";
import getPercentagesOfTweetsGroupByLabel from "../api/getPercentagesOfTweetsGroupByLabel";
import { useFiltering } from '../store/filtering';

const DatasetLabelComparisonChart = () => {

  const ref = useRef<Plot<PieOptions>>(null);

  const { data, isLoading } = useQuery('getPercentagesOfTweetsGroupByLabel', getPercentagesOfTweetsGroupByLabel);

  const store = useFiltering();

  const addClickEventListener = () => {
    const arr: ('true' | 'false')[] = [];

    const onClick = (e: any) => {
      const text = e.target.cfg.parent.cfg.children.find((e: any) => e.constructor.name === 'Text3').attrs.text;

      const idx = arr.indexOf(text);

      if (idx !== -1) {
        arr.splice(idx);
      } else {
        arr.push(text);
      }

      if (arr.length === 1) {
        store.setLabel(arr[0] === 'true' ? 'false' : 'true');
      } else {
        store.setLabel(null);
      }
    };

    if (ref.current) {
      ref.current.on('legend-item:click', onClick);
    }

    return () => {
      if (ref.current) {
        ref.current.off('legend-item:click', onClick);
      }
    };
  }

  if (isLoading) {
    return <Spin />
  }

  return (
    <PieChart onReady={addClickEventListener} chartRef={ref} angleField={"count"} colorField={"_id"} data={data} innerRadius={0.6} />
  );
};

export default DatasetLabelComparisonChart;