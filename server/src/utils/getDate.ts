export const getDateAfter = (count: number, date: Date = new Date()) : Date=> {
  const newDate = date;
  newDate.setDate(date.getDate() + count);
  return newDate;
};