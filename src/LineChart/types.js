// @flow

export type DataPoint = {
  +month: string,
  +assets: number,
  +equity: number,
  +income: number,
  +expenses: number,
  +liabilities: number
};

export type LineChartProps = {
  +data: Array<DataPoint>
};

export type LineChartState = {
  +data: Array<DataPoint>
};
