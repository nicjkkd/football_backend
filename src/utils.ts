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

export const isValidDate = (d: unknown): d is Date => {
  return d instanceof Date && !isNaN(d.getTime());
};
