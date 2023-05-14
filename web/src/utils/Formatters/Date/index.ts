import { padTo2Digits } from '../String';

import { IFormatDatePtBRProps } from './IDateProps';

const convertStringToDate = (date: Date) => {
  return typeof date === 'string' ? new Date(date) : date;
};

export const formatDatePtBR = (options: IFormatDatePtBRProps): string => {
  const date = convertStringToDate(options.date);

  var dateFormated = [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear()
  ].join('/');

  dateFormated += ' ' + formatHoursMinutesSeconds(date)

  return dateFormated.trimEnd();
};

export const formatHoursMinutesSeconds = (date: Date) => {
  const dateConverted = convertStringToDate(date);

  return [
    dateConverted.getHours(),
    padTo2Digits(dateConverted.getMinutes()),
    padTo2Digits(dateConverted.getSeconds())
  ].join(':');
};