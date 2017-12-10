import * as R from 'ramda';
import padEnd from 'lodash.padend';

function* chunksGenerator(iterable, n) {
  for (let i = 0; i < iterable.length / n; i++) {
    yield R.slice(n * i, n * (i + 1), iterable);
  }
}

const chunks = (...args) => Array.from(chunksGenerator(...args));

export function transformAmount(amount) {
  return {
    symbol: amount.acommodity ? amount.acommodity : '$',
    quantity: Number(amount.aquantity),
    style: {
      side: amount.astyle.ascommodityside,
      spaced: amount.astyle.ascommodityspaced,
      decimalPoint: amount.astyle.asdecimalpoint,
      precision: amount.astyle.asprecision || 2,
      digitSeparator: amount.astyle.asdigitgroups
        ? amount.astyle.asdigitgroups[0]
        : ',',
      numDigitsInGroup: amount.astyle.asdigitgroups
        ? amount.astyle.asdigitgroups[1]
        : 3
    },
    format() {
      return `${this.formatPrefix()}${this.formatNumber()}${this.formatSuffix()}`;
    },
    formatPrefix() {
      return this.style.side === 'L' ? this.symbol : '';
    },
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
    },
    formatInteger(integer) {
      return R.reverse(
        chunks(R.reverse(integer), this.style.numDigitsInGroup).join(
          this.style.digitSeparator
        )
      );
    },
    formatFractional(fractional) {
      // for now, just truncate
      // TODO handle rounding
      return fractional.substring(0, this.style.precision);
    },
    formatSuffix() {
      return this.style.side === 'R' ? this.symbol : '';
    }
  };
}
