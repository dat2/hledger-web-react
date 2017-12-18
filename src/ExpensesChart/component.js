// @flow

// 3rd-party imports
import React from 'react';
import {
  AreaChart,
  CartesianGrid,
  Legend,
  Area,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

import type { ExpensesChartProps } from './types';

const ExpensesChartView = ({ data }: ExpensesChartProps) => (
  <div className="w-100 h-100 overflow-hidden">
    <ResponsiveContainer>
      <AreaChart data={data}>
        <XAxis dataKey="currentDate" />
        <YAxis />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Tooltip />
        <Legend verticalAlign="top" height={36} />
        <Area
          type="monotone"
          dataKey="currentExpenses"
          stroke="blue"
          fill="blue"
        />
        <Area
          type="monotone"
          dataKey="previousExpenses"
          stroke="green"
          fill="green"
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

export default ExpensesChartView;
