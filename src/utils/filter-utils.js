import dayjs from 'dayjs';
import { FILTER_TYPES } from '../const';

function isPresent(date) {
  const currentDate = dayjs().format('YYYY/MM/DD');
  const pointDate = dayjs(date).format('YYYY/MM/DD');
  return dayjs(pointDate).isSame(currentDate);
}

function isPast(date) {
  const currentDate = dayjs().format('YYYY/MM/DD');
  const pointDate = dayjs(date).format('YYYY/MM/DD');
  return dayjs(pointDate).isBefore(currentDate);
}

function isFuture(date) {
  const currentDate = dayjs().format('YYYY/MM/DD');
  const pointDate = dayjs(date).format('YYYY/MM/DD');
  return dayjs(pointDate).isAfter(currentDate);
}

const FILTER = {
  [FILTER_TYPES.EVERYTHING]: (points) => points,
  [FILTER_TYPES.FUTURE]: (points) => points.filter((point) => isFuture(point.dateFrom)),
  [FILTER_TYPES.PRESENT]: (points) => points.filter((point) => isPresent(point.dateFrom)),
  [FILTER_TYPES.PAST]: (points) => points.filter((point) => isPast(point.dateFrom)),
};

export { FILTER };
