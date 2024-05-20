import { Offer } from './mock/offer';

const CITIES = ['Amsterdam', 'Paris', 'London', 'Stockholm', 'Warsaw', 'Berlin', 'Athens'];
const POINT_TYPES = ['taxi', 'flight', 'bus', 'train', 'ship', 'drive', 'check-in', 'sightseeing', 'restaurant'];
const DESCRIPTION = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.';

const OFFERS = new Map([
  ['taxi', [new Offer('Order Uber', 40), new Offer('Switch to comfort', 35), new Offer('Trip with a dog', 55), new Offer('Drive fast', 60), new Offer('Text communication only', 10), new Offer('Add luggage', 90)]],
  ['bus', [new Offer('Trip with a cat', 45), new Offer('Book tickets', 30), new Offer('Add luggage', 85), new Offer('Reclining seat', 55)]],
  ['train', [new Offer('Book tickets', 40), new Offer('Add luggage', 75), new Offer('Reclining seat', 80)]],
  ['ship', [new Offer('Trip with a pet', 100), new Offer('Add big luggage', 105), new Offer('Book tickets', 60), new Offer('Sleeping place', 150), new Offer('Add breakfast', 120)]],
  ['drive', [new Offer('Rent a car', 100), new Offer('Trip with a pet', 80), new Offer('Add luggage', 40)]],
  ['flight', [new Offer('Reclining seat', 200), new Offer('Add breakfast', 190), new Offer('Add luggage', 105), new Offer('Flight with a pet', 120)]],
  ['check-in', [new Offer('Book tickets', 45), new Offer('Add luggage', 75), new Offer('Add breakfast', 110)]],
  ['sightseeing', [new Offer('Lunch in city', 150), new Offer('Choose a speaker', 200), new Offer('To see a secret place', 120)]],
  ['restaurant', [new Offer('Table for two', 105), new Offer('Book a table', 55), new Offer('Italian cuisine', 35), new Offer('Japanese cuisine', 65)]],
]);

const PRICE = {
  MIN: 1,
  MAX: 1000
};

const TIME_PERIODS = {
  MSEC_IN_SEC: 1000,
  SEC_IN_MIN: 60,
  MIN_IN_HOUR: 60,
  HOUR_IN_DAY: 24,
  MSEC_IN_HOUR: (60 * 60 * 1000),
  MSEC_IN_DAY: 24 * (60 * 60 * 1000)
};

const DURATION = {
  HOUR: 5,
  DAY: 5,
  MIN: 59
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

const MODE = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
  CREATIING: 'CREATING'
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

export {
  CITIES, POINT_TYPES, DESCRIPTION, PRICE, POINT_EMPTY, QUANTITIES, MODE, SORT_TYPES, OFFERS,
  FILTER_TYPES, DURATION, TIME_PERIODS, UPDATE_TYPES, USER_ACTION, FILTER_MESSAGES
};
