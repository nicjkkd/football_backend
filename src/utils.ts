interface Filter {
  lt: Date;
  gt: Date;
}

export const buildBirthDateFilterObj = (
  convertedYoungerThan: Date,
  convertedOlderThan: Date
) => {
  const filterParamsObj = {} as Filter;
  if (convertedYoungerThan) filterParamsObj.lt = convertedYoungerThan;
  if (convertedOlderThan) filterParamsObj.gt = convertedOlderThan;
  return Object.keys(filterParamsObj).length
    ? { dateBirth: filterParamsObj }
    : {};
};
