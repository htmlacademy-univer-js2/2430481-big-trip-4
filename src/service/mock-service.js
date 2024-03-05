import { generateDestination } from '../mock/destination.js';
import { generateOffer } from '../mock/offer.js';
import { generatePoint } from '../mock/point.js';

import { getRandomArrayElement, getRandomInteger } from '../utils.js';
import { TYPES, Quantities } from '../const.js';

export default class MockService {
  destinations = [];
  offers = [];
  points = [];

  constructor() {
    this.destinations = this.generateDestinations();
    this.offers = this.generateOffers();
    this.points = this.generatePoints();
  }

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }

  getPoints() {
    return this.points;
  }

  generateDestinations() {
    return Array.from(
      { length: Quantities.destinationsCount },
      () => generateDestination()
    );
  }

  generateOffers() {
    return TYPES.map((type) => ({
      type,
      offers: Array.from({ length: getRandomInteger(0, Quantities.offersCount) }, () => generateOffer(type))
    }));
  }

  generatePoints() {
    return Array.from({ length: Quantities.pointsCount }, () => {
      const type = getRandomArrayElement(TYPES);
      const destination = getRandomArrayElement(this.destinations);
      const hasOffers = getRandomInteger(0, 1);
      const offersByType = this.offers
        .find((offerByType) => offerByType.type === type);

      const offerIds = (hasOffers)
        ? offersByType.offers
          .slice(0, getRandomInteger(0, Quantities.offersCount))
          .map((offer) => offer.id)
        : [];

      return generatePoint(type, destination.id, offerIds);
    });
  }
}
