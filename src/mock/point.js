import { Price, TYPES } from '../const.js';
import { getRandomInteger, getDate, getRandomArrayElement } from '../utils.js';
import { generateDestination } from './destination.js';
import { generateOffer } from './offer.js';

const BOUND = 4;

function generatePoint() {
  const offerCount = Math.floor(Math.random() * BOUND + 1);
  return {
    id: crypto.randomUUID(),
    basePrice: getRandomInteger(Price.MIN, Price.MAX),
    dateFrom: getDate({ next: false }),
    dateTo: getDate({ next: true }),
    destination: generateDestination,
    isFavorite: Boolean(getRandomInteger(0, 1)),
    offers: Array.from({ length: offerCount }, () => generateOffer()),
    type: getRandomArrayElement(TYPES)
  };
}

export { generatePoint };
