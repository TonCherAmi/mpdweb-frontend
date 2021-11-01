export const normalize = (str: string): string => {
  // decomposes combined graphemes like 'á' into 'a' + '`', then removes the diacritics
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, '')
}
