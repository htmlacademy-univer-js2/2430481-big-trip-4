import dayjs from 'dayjs';
import { CITIES, PRICE, POINT_TYPES } from '../const.js';
import { getRandomInteger, getRandomDate, getRandomArrayElement, addRandomTimespan } from '../utils.js';
import { generateDestination } from './destination.js';
import { generateOffer } from './offer.js';

function generatePoint() {
  const dateFrom = getRandomDate();
  const type = getRandomArrayElement(POINT_TYPES);
  return {
    id: crypto.randomUUID(),
    basePrice: getRandomInteger(PRICE.MIN, PRICE.MAX),
    dateFrom: dateFrom,
    dateTo: addRandomTimespan(dateFrom),
    destination: generateDestination(getRandomArrayElement(CITIES)),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    type,
    offers: generateOffer(type)
  };
}

function getDefaultPoint() {
  const type = getRandomArrayElement(POINT_TYPES);
  const dateFrom = dayjs().format('YYYY/MM/DD');
  return {
    id: crypto.randomUUID(),
    basePrice: 0,
    dateFrom,
    dateTo: addRandomTimespan(dateFrom),
    destination: generateDestination(getRandomArrayElement(CITIES)),
    isFavorite: false,
    type,
    offers: generateOffer(type)
  };
}

export { generatePoint, getDefaultPoint };
