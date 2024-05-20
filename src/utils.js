import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import { TIME_PERIODS, DURATION, FILTER_TYPES } from './const';

dayjs.extend(duration);
dayjs.extend(relativeTime);

function getRandomDate() {
  return dayjs().add(getRandomInteger(0, DURATION.DAY), 'day').toDate();
}

function addRandomTimespan(date) {
  const minsGap = getRandomInteger(0, DURATION.MIN);
  const hoursGap = getRandomInteger(1, DURATION.HOUR);
  const daysGap = getRandomInteger(0, DURATION.DAY);
  date = dayjs(date)
    .add(minsGap, 'minute')
    .add(hoursGap, 'hour')
    .add(daysGap, 'day')
    .toDate();
  return date;
}

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomInteger(a = 0, b = 1) {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
}

function humanizeDate(format, date) {
  return dayjs(date).format(format);
}

function getPointDuration(point) {
  const timeDiff = dayjs(point.dateTo).diff(dayjs(point.dateFrom));

  let pointDuration = 0;

  switch (true) {
    case (timeDiff >= TIME_PERIODS.MSEC_IN_DAY):
      pointDuration = dayjs.duration(timeDiff).format('DD[D] HH[H] mm[M]');
      break;
    case (timeDiff >= TIME_PERIODS.MSEC_IN_HOUR):
      pointDuration = dayjs.duration(timeDiff).format('HH[H] mm[M]');
      break;
    case (timeDiff < TIME_PERIODS.MSEC_IN_HOUR):
      pointDuration = dayjs.duration(timeDiff).format('mm[M]');
      break;
  }

  return pointDuration;
}

function getTripTitle(cities) {
  if (cities.length > 3) {
    return `${cities[0]} &mdash; ... &mdash; ${cities[cities.length - 1]}`;
  }
  return cities.reduce((acc, city, index) => {
    if (index !== cities.length - 1) {
      acc += `${city} &mdash; `;
    } else {
      acc += `${city}`;
    }
    return acc;
  }, '');
}

function getTripStartDate(sortedPoints) {
  return dayjs(sortedPoints[0].dateFrom).format('MMM DD');
}

function getTripEndDate(sortedPoints) {
  const startDate = sortedPoints[0].dateFrom;
  const endDate = sortedPoints[sortedPoints.length - 1].dateTo;
  if (dayjs(startDate).format('MMM') === dayjs(endDate).format('MMM')) {
    return dayjs(endDate).format('DD');
  } else {
    return dayjs(endDate).format('MMM DD');
  }
}

function updateItems(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

function sortByTime(points) {
  return points.sort((firstPoint, secondPoint) =>
    dayjs(firstPoint.dateFrom).diff(dayjs(firstPoint.dateTo), 'minutes') -
    dayjs(secondPoint.dateFrom).diff(dayjs(secondPoint.dateTo), 'minutes'));
}

function sortByPrice(points) {
  return points.sort((firstPoint, secondPoint) => secondPoint.basePrice - firstPoint.basePrice);
}

function sortByDay(points) {
  return points.sort((firstPoint, secondPoint) => new Date(firstPoint.dateFrom) - new Date(secondPoint.dateFrom));
}

function isFuture(dateFrom) {
  const formatedDate = dayjs(dateFrom).format('YYYY/MM/DD');
  const currentDate = dayjs().format('YYYY/MM/DD');
  return dayjs(formatedDate).isAfter(currentDate);
}

function isPresent(dateFrom) {
  const formatedDate = dayjs(dateFrom).format('YYYY/MM/DD');
  const currentDate = dayjs().format('YYYY/MM/DD');
  return dayjs(formatedDate).isSame(currentDate);
}

function isPast(dateFrom) {
  const formatedDate = dayjs(dateFrom).format('YYYY/MM/DD');
  const currentDate = dayjs().format('YYYY/MM/DD');
  return dayjs(formatedDate).isBefore(currentDate);
}

const filter = {
  [FILTER_TYPES.EVERYTHING]: (points) => points,
  [FILTER_TYPES.FUTURE]: (points) => points.filter((point) => isFuture(point.dateFrom)),
  [FILTER_TYPES.PRESENT]: (points) => points.filter((point) => isPresent(point.dateFrom)),
  [FILTER_TYPES.PAST]: (points) => points.filter((point) => isPast(point.dateFrom)),
};

export {
  getRandomArrayElement,
  getRandomInteger,
  humanizeDate,
  getPointDuration,
  getRandomDate,
  addRandomTimespan,
  getTripTitle,
  getTripStartDate,
  getTripEndDate,
  updateItems,
  sortByDay,
  sortByPrice,
  sortByTime,
  filter
};
