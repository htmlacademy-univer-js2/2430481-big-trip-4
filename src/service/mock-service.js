import { generatePoint } from '../mock/point.js';
import { getRandomInteger } from '../utils.js';

export default class MockService {
  points = [];

  constructor() {
    this.points = this.generatePoints();
  }

  getPoints() {
    return this.points;
  }

  generatePoints() {
    return Array.from({ length: getRandomInteger(0, 5) }, () =>
      generatePoint());
  }
}
