const CITIES = ['Amsterdam', 'Paris', 'London', 'Stockholm', 'Warsaw', 'Berlin', 'Athens'];
const POINT_TYPES = ['taxi', 'flight', 'bus', 'train', 'ship', 'drive', 'check-in', 'sightseeing', 'restaurant'];
const DESCRIPTION = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.';

const PRICE = {
  MIN: 1,
  MAX: 1000
};

const QUANTITIES = {
  offersCount: 5,
  destinationsCount: 5,
  pointsCount: 5
};

const POINT_EMPTY = {
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: null,
  isFavorite: false,
  offers: [],
  type: 'flight'
};

const OFFERS = [
  'Add luggage',
  'Switch to comfort class',
  'Add meal',
  'Choose seats',
  'Travel by train'
];

const MODE = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const SORT_TYPE = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
};

export { CITIES, POINT_TYPES as TYPES, DESCRIPTION, PRICE, OFFERS, POINT_EMPTY, QUANTITIES, MODE, SORT_TYPE };
