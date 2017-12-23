// @flow

import type { AccountsState } from './Accounts/types';
import type { ExpensesChartState } from './ExpensesChart/types';
import type { TransactionsState } from './Transactions/types';

export type ReduxState = {
  +accounts: AccountsState,
  +expensesChart: ExpensesChartState,
  +transctions: TransactionsState
};
