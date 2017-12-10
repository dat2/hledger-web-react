// 3rd-party imports
import React from 'react';
import sizeMe from 'react-sizeme';
import {
  CartesianGrid,
  Legend,
  LineChart,
  Line,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import styled from 'styled-components';

const ChartView = ({ className, data, size }) => (
  <div className={className}>
    <LineChart width={size.width} height={size.height} data={data}>
      <Line type="monotone" dataKey="assets" stroke="blue" />
      <Line type="monotone" dataKey="equity" stroke="green" />
      <Line type="monotone" dataKey="income" stroke="gray" />
      <Line type="monotone" dataKey="expenses" stroke="red" />
      <Line type="monotone" dataKey="liabilities" stroke="orange" />
      <Legend verticalAlign="top" height={36} />
      <Tooltip />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="date" />
      <YAxis />
    </LineChart>
  </div>
);

const FullHeightChartView = styled(ChartView)`
  height: 100%;
`;

export default sizeMe({ monitorHeight: true })(FullHeightChartView);
