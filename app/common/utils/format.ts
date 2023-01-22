export const getPluralSuffix = (number: number) => number === 1 ? '' : 's'

export const getOrPlaceholder = (string: Nullable<string>) => string ?? '-'
