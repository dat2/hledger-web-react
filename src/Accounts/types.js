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

export type AccountsViewProps = {
  accounts: Array<Account>
};

export type AccountRowProps = {
  account: Account
};

export type AccountRowState = {
  hidden: boolean
};
