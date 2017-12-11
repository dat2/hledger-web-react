export type DataPoint = {
  currentExpenses: number,
  currentDate: string,
  previousExpenses: number,
  previousDate: string
};

export type ExpensesChartProps = {
  data: Array<DataPoint>
};
