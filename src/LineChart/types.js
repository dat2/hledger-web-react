// @flow

export type DataPoint = {
  month: string,
  assets: number,
  equity: number,
  income: number,
  expenses: number,
  liabilities: number
};

export type ChartViewProps = {
  data: Array<DataPoint>
};
