import { getRandomArrayElement } from '../utils';

export default class OffersModel {
  constructor(service) {
    this.service = service;
    this.offers = this.service.getOffers();
  }

  get() {
    return this.offers;
  }

  getRandomOffer() {
    return getRandomArrayElement(this.offers);
  }
}
