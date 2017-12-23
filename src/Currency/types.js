// @flow

export type HledgerAmountStyle = {
  ascommodityside: 'L' | 'R',
  ascommodityspaced: boolean,
  asdecimalpoint: string,
  asdigitgroups?: [string, number],
  asprecision: string
};

export type HledgerAmount = {
  acommodity: string,
  aquantity: string,
  astyle: HledgerAmountStyle
};

export type AmountStyle = {
  side: 'L' | 'R',
  spaced: boolean,
  decimalPoint: string,
  precision: number,
  digitSeparator: string,
  numDigitsInGroup: number
};

export type Amount = {
  symbol: string,
  quantity: number,
  style: AmountStyle
};
