const CITIES = ['Amsterdam', 'Paris', 'London', 'Stockholm', 'Warsaw', 'Berlin', 'Athens'];
const TYPES = ['taxi', 'flight', 'bus', 'train', 'ship', 'drive', 'check-in', 'sightseeing', 'restaurant'];
const DESCRIPTION = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.';

const Price = {
  MIN: 1,
  MAX: 1000
};

const Quantities = {
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

export { CITIES, TYPES, DESCRIPTION, Price, OFFERS, POINT_EMPTY, Quantities };
