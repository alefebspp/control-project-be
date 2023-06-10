export const getMinutesDifferenceBetweenDates = (
  lastDateMilliseconds: number,
  firstDateMilliseconds: number,
) => {
  const differecenInMilliseconds = Math.abs(
    lastDateMilliseconds - firstDateMilliseconds,
  );

  const differenceInMinutes = Math.floor(
    (differecenInMilliseconds % (1000 * 60 * 60)) / (1000 * 60),
  );

  return differenceInMinutes;
};

export const getHoursDifferenceBetweenDates = (
  lastDateMilliseconds: number,
  firstDateMilliseconds: number,
) => {
  const differecenInMilliseconds = Math.abs(
    lastDateMilliseconds - firstDateMilliseconds,
  );

  const differenceInHours = Math.floor(
    differecenInMilliseconds / (1000 * 60 * 60),
  );

  return differenceInHours;
};
