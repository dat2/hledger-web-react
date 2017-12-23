// @flow
import type { HledgerAmount, Amount } from '../Currency/types';

export type AccountsState = {
  +accounts: Array<Account>,
  +error: ?Error
};

export type HledgerAccount = {
  aname: string,
  aibalance: Array<HledgerAmount>,
  asubs: Array<HledgerAccount>
};

export type Account = {
  name: string,
  amounts: Array<Amount>,
  children: Array<Account>
};

export type RootProps = {
  accounts: Array<Account>
};

export type NodeProps = {
  +account: Account,
  +hidden: boolean,
  +onClick: Event => void
};
