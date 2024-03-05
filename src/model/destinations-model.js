import { getRandomArrayElement } from '../utils';

export default class DestinationsModel {
  constructor(service) {
    this.service = service;
    this.destinations = this.service.getDestinations();
  }

  get() {
    return this.destinations;
  }

  getRandomDestination() {
    return getRandomArrayElement(this.destinations);
  }
}
