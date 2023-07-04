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

export const resetDateTime = (date: Date | undefined) => {
  if (date) {
    const newDate = new Date(date);
    newDate.setUTCHours(0, 0, 0, 0);
    return newDate;
  }
};

function formatDateISOString(ISOString: string) {
  const splitedISOString = ISOString.split('T');
  const formatedString = splitedISOString[0];
  return formatedString;
}

export function checkIfCurrentDateEqualsRegistryDate(registryDate: Date) {
  const actualDateString = formatDateISOString(
    resetDateTime(new Date()).toISOString(),
  );
  const registryDateString = formatDateISOString(registryDate.toISOString());

  return actualDateString == registryDateString;
}
