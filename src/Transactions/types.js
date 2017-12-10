import type { HledgerAmount, Amount } from '../Currency';

export type HledgerTransaction = {
  tdate: string,
  tdescription: string,
  tpostings: Array<HledgerPosting>
};

export type Transaction = {
  date: string,
  description: string,
  postings: Array<Posting>
};

export type HledgerPosting = {
  paccount: string,
  pamount: Array<HledgerAmount>
};

export type Posting = {
  account: string,
  amounts: Array<Amount>
};
