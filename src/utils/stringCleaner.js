export const stringCleaner = (args) => {
  // prettier-ignore
  return args
    .replaceAll('/', '-')
    .replaceAll(',', '-')
    .replaceAll('.', '-')
    .replaceAll('&', '-');
};
