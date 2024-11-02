interface Filter {
  lt: number;
  gt: number;
}

export const getQueryNumberValue = (queryString: unknown): number | null => {
  if (queryString === undefined || queryString === null) {
    return null;
  }

  const parsedValue = Number(queryString);

  if (Number.isNaN(parsedValue)) {
    return null;
  }

  return parsedValue;
};

export const buildAgeFilterObj = (
  convertedYoungerThan: number | null,
  convertedOlderThan: number | null
) => {
  const filterParamsObj = {} as Filter;
  if (convertedYoungerThan) filterParamsObj.lt = convertedYoungerThan;
  if (convertedOlderThan) filterParamsObj.gt = convertedOlderThan;
  return Object.keys(filterParamsObj).length ? { age: filterParamsObj } : {};
};
