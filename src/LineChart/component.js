// 3rd-party imports
import React from 'react';
import {
  CartesianGrid,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import styled from 'styled-components';

const HiddenOverflow = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const ChartView = ({ data }) => (
  <HiddenOverflow>
    <ResponsiveContainer>
      <LineChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Tooltip />
        <Legend verticalAlign="top" height={36} />
        <Line type="monotone" dataKey="assets" stroke="blue" />
        <Line type="monotone" dataKey="equity" stroke="green" />
        <Line type="monotone" dataKey="income" stroke="gray" />
        <Line type="monotone" dataKey="expenses" stroke="red" />
        <Line type="monotone" dataKey="liabilities" stroke="orange" />
      </LineChart>
    </ResponsiveContainer>
  </HiddenOverflow>
);

export default ChartView;
