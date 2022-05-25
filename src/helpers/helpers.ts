const getWeatherItemIsoDate = (dateTime: number) =>
  new Date(dateTime * 1000).toISOString();

const getWeekDaysByDateTime = (dateTime: number) => {
  const numberOfDaysInWeek = 7;
  const currentDate = new Date(dateTime * 1000);

  return new Array(numberOfDaysInWeek)
    .fill(null)
    .map(
      (_, index) =>
        new Date(
          currentDate.setDate(
            currentDate.getDate() -
              (currentDate.getDay() !== 0
                ? currentDate.getDay()
                : numberOfDaysInWeek) +
              index +
              1
          )
        )
    );
};

const compareDays = (dateTime1: number, dateTime2: number) => {
  const date1 = new Date(dateTime1);
  const date2 = new Date(dateTime2);

  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export { compareDays, getWeatherItemIsoDate, getWeekDaysByDateTime };
