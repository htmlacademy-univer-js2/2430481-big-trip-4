import { getRandomInteger, getRandomArrayElement } from '../utils.js';
import { OFFERS, PRICE } from '../const.js';

function generateOffer() {
  const offer = getRandomArrayElement(OFFERS);

  return {
    id: crypto.randomUUID(),
    title: offer,
    price: getRandomInteger(PRICE.MIN, (PRICE.MAX / 10))
  };
}

export { generateOffer };
