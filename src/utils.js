import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(duration);
dayjs.extend(relativeTime);

const TimePeriods = {
  MSEC_IN_SEC: 1000,
  SEC_IN_MIN: 60,
  MIN_IN_HOUR: 60,
  HOUR_IN_DAY: 24,
  MSEC_IN_HOUR: (60 * 60 * 1000),
  MSEC_IN_DAY: 24 * (60 * 60 * 1000)
};

const Duration = {
  HOUR: 5,
  DAY: 5,
  MIN: 59
};


function getDate({ next }) {
  let date = dayjs().subtract(getRandomInteger(0, Duration.DAY), 'day').toDate();
  const minsGap = getRandomInteger(0, Duration.MIN);
  const hoursGap = getRandomInteger(1, Duration.HOUR);
  const daysGap = getRandomInteger(0, Duration.DAY);

  if (next) {
    date = dayjs(date)
      .add(minsGap, 'minute')
      .add(hoursGap, 'hour')
      .add(daysGap, 'day')
      .toDate();
  }

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
    case (timeDiff >= TimePeriods.MSEC_IN_DAY):
      pointDuration = dayjs.duration(timeDiff).format('DD[D] HH[H] mm[M]');
      break;
    case (timeDiff >= TimePeriods.MSEC_IN_HOUR):
      pointDuration = dayjs.duration(timeDiff).format('HH[H] mm[M]');
      break;
    case (timeDiff < TimePeriods.MSEC_IN_HOUR):
      pointDuration = dayjs.duration(timeDiff).format('mm[M]');
      break;
  }

  return pointDuration;
}

export {
  getRandomArrayElement,
  getRandomInteger,
  humanizeDate,
  getPointDuration,
  getDate
};
