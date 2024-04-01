import AbstractView from '../framework/view/abstract-view.js';
import { getTripTitle, getTripStartDate, getTripEndDate } from '../utils';

function createTripInfoTemplate(points) {
  const total = points.reduce((acc, point) => acc + point.basePrice, 0);
  const sortedPoints = points.sort((a, b) => a.dateFrom - b.dateFrom);
  const tripInfoTitle = getTripTitle(sortedPoints.map((point) => point.destination.name));

  return (
    `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
            <h1 class="trip-info__title">${tripInfoTitle}</h1>
            <p class="trip-info__dates">${getTripStartDate(sortedPoints)}&nbsp;&mdash;&nbsp;${getTripEndDate(sortedPoints)}</p>
            </div>
            <p class="trip-info__cost">
            Total: &euro;&nbsp;<span class="trip-info__cost-value">${total}</span>
            </p>
        </section>`
  );
}

export default class TripInfoView extends AbstractView {
  #points = null;

  constructor(points) {
    super();
    this.#points = [...points];
  }

  get template() {
    return createTripInfoTemplate(this.#points);
  }
}
