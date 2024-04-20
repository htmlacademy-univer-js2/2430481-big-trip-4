import { PRICE, TYPES } from '../const.js';
import { getRandomInteger, getRandomDate, getRandomArrayElement, addRandomTimespan } from '../utils.js';
import { generateDestination } from './destination.js';
import { generateOffer } from './offer.js';

const BOUND = 4;

function generatePoint() {
  const offerCount = Math.floor(Math.random() * BOUND + 1);
  const dateFrom = getRandomDate();
  return {
    id: crypto.randomUUID(),
    basePrice: getRandomInteger(PRICE.MIN, PRICE.MAX),
    dateFrom: dateFrom,
    dateTo: addRandomTimespan(dateFrom),
    destination: generateDestination(),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    offers: Array.from({ length: offerCount }, () => generateOffer()),
    type: getRandomArrayElement(TYPES)
  };
}

export { generatePoint };
