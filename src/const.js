const POINT_TYPES = ['taxi', 'flight', 'bus', 'train', 'ship', 'drive', 'check-in', 'sightseeing', 'restaurant'];

const TIME_PERIODS = {
  MSEC_IN_SEC: 1000,
  SEC_IN_MIN: 60,
  MIN_IN_HOUR: 60,
  HOUR_IN_DAY: 24,
  MSEC_IN_HOUR: (60 * 60 * 1000),
  MSEC_IN_DAY: 24 * (60 * 60 * 1000)
};

const POINT_EMPTY = {
  id: null,
  type: null,
  basePrice: null,
  dateFrom: null,
  dateTo: null,
  destination: null,
  offers: [],
  isFavorite: false,
};

const MODE = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
  CREATING: 'CREATING'
};

const USER_ACTION = {
  UPDATE_TASK: 'UPDATE_TASK',
  ADD_TASK: 'ADD_TASK',
  DELETE_TASK: 'DELETE_TASK',
};

const UPDATE_TYPES = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT'
};

const SORT_TYPES = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
};

const FILTER_TYPES = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const FILTER_MESSAGES = {
  'everything': 'Click New Event to create your first point',
  'future': 'There are no future events now',
  'present': 'There are no present events now',
  'past': 'There are no past events now',
};

const REQUEST_METHOD = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
};

export {
  POINT_TYPES, POINT_EMPTY, MODE, SORT_TYPES, FILTER_TYPES, TIME_PERIODS,
  UPDATE_TYPES, USER_ACTION, FILTER_MESSAGES, REQUEST_METHOD
};
