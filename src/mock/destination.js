import { getRandomInteger } from '../utils.js';
import { DESCRIPTION } from '../const.js';

function generateDestination(city) {
  return {
    id: crypto.randomUUID(),
    description: DESCRIPTION,
    name: city,
    pictures: Array.from({ length: getRandomInteger(1, 5) }, () => ({
      'src': `https://loremflickr.com/248/152?random=${crypto.randomUUID()}`,
      'description': `${city} description`
    }))
  };
}

function getDefaultDestination() {
  return {
    id: null,
    description: '',
    img: null,
  };
}

export { generateDestination, getDefaultDestination };
