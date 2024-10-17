export const phoneRegex = new RegExp(
  /(?<!\w)(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)/,
);
export const peselRegex = new RegExp(/\d{4}[0-3]{1}\d{6}/);
export const nipRegex = new RegExp(/^\d{3}-?\d{3}-?\d{2}-?\d{2}$/);
export const regonRegex = new RegExp(/^\d{9}(\d{5})?$/);
