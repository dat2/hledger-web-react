// @flow

import type { AccountsState } from './Accounts/types';
import type { LineChartState } from './LineChart/types';
import type { ExpensesChartState } from './ExpensesChart/types';
import type { RegisterState } from './Register/types';
import type { TransactionsState } from './Transactions/types';

export type ReduxState = {
  +accounts: AccountsState,
  +lineChart: LineChartState,
  +expensesChart: ExpensesChartState,
  +register: RegisterState,
  +transactions: TransactionsState
};
