import { generatePoint } from '../mock/point.js';
import { getRandomInteger } from '../utils.js';

export default class MockService {
  // destinations = [];
  // offers = [];
  points = [];

  constructor() {
    this.points = this.generatePoints();
  }

  getPoints() {
    return this.points;
  }

  // generateDestinations() {
  //   return Array.from(
  //     { length: QUANTITIES.destinationsCount },
  //     () => generateDestination(getRandomArrayElement(CITIES))
  //   );
  // }

  // generateOffers() {
  //   return TYPES.map((type) => ({
  //     type,
  //     offers: Array.from({ length: getRandomInteger(0, QUANTITIES.offersCount) }, () => generateOffer(type))
  //   }));
  // }

  generatePoints() {
    return Array.from({ length: getRandomInteger(0, 5) }, () =>
      generatePoint());
  }
}
