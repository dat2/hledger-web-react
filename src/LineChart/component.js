// @flow

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

import type { ChartViewProps } from './types';

const ChartView = ({ data }: ChartViewProps) => (
  <div className="w-100 h-100 overflow-hidden">
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
  </div>
);

export default ChartView;
