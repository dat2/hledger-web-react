// ref: https://github.com/facebook/flow/issues/2801#issuecomment-305002446

declare class Intl$NumberFormat {
  constructor(locales: string | Array<string>, options?: Object): void;
  format(number: Number): string;
}

declare type IntlType = {
  NumberFormat: Class<Intl$NumberFormat>
};

// TODO: handle this later
// Mark it as possibly undefined since
// Safari and some recent versions of Firefox for Android do not implement it.
// declare var Intl: typeof undefined | IntlType;

declare var Intl: IntlType;
