import { getRandomInteger, getRandomArrayElement } from '../utils.js';
import { OFFERS, Price } from '../const.js';

function generateOffer() {
  const offer = getRandomArrayElement(OFFERS);

  return {
    id: crypto.randomUUID(),
    title: offer,
    price: getRandomInteger(Price.MIN, (Price.MAX / 10))
  };
}

export { generateOffer };
