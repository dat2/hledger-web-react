// @flow

import * as R from 'ramda';
import padEnd from 'lodash.padend';

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

function* chunksGenerator(iterable, n) {
  for (let i = 0; i < iterable.length / n; i++) {
    yield R.slice(n * i, n * (i + 1), iterable);
  }
}

const chunks = (...args) => Array.from(chunksGenerator(...args));

export class Currency {
  symbol: string;
  quantity: number;
  style: AmountStyle;

  constructor(currency: Amount) {
    this.symbol = currency.symbol;
    this.quantity = currency.quantity;
    this.style = currency.style;
  }

  format() {
    return `${this.formatPrefix()}${this.formatNumber()}${this.formatSuffix()}`;
  }

  formatPrefix() {
    return this.style.side === 'L'
      ? this.symbol + (this.style.spaced ? ' ' : '')
      : '';
  }

  formatNumber() {
    const string = this.quantity.toString();
    const [integer, fractionalMaybe] = string.split('.');
    const fractional = padEnd(
      R.defaultTo('0')(fractionalMaybe),
      this.style.precision,
      '0'
    );
    return `${this.formatInteger(integer)}${
      this.style.decimalPoint
    }${this.formatFractional(fractional)}`;
  }

  formatInteger(integer: string) {
    return R.reverse(
      chunks(R.reverse(integer), this.style.numDigitsInGroup).join(
        this.style.digitSeparator
      )
    );
  }

  formatFractional(fractional: string) {
    // for now, just truncate
    // TODO handle rounding
    return fractional.substring(0, this.style.precision);
  }

  formatSuffix() {
    return this.style.side === 'R'
      ? (this.style.spaced ? ' ' : '') + this.symbol
      : '';
  }
}

export function transformAmount(amount: HledgerAmount): Amount {
  return {
    symbol: amount.acommodity ? amount.acommodity : '$',
    quantity: Number(amount.aquantity),
    style: {
      side: amount.astyle.ascommodityside,
      spaced: amount.astyle.ascommodityspaced,
      decimalPoint: amount.astyle.asdecimalpoint,
      precision: Number(amount.astyle.asprecision) || 2,
      digitSeparator: amount.astyle.asdigitgroups
        ? amount.astyle.asdigitgroups[0]
        : ',',
      numDigitsInGroup: amount.astyle.asdigitgroups
        ? amount.astyle.asdigitgroups[1]
        : 3
    }
  };
}
