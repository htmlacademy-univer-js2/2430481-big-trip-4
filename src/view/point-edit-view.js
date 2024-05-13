import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { POINT_EMPTY, TYPES, CITIES } from '../const.js';
import { humanizeDate } from '../utils.js';

function createPointCitiesOptionsTemplate() {
  return (
    `<datalist id="destination-list-1">
      ${CITIES.reduce((acc, city) => acc.concat(`<option value="${city}"></option>`), '')}
    </div>`
  );
}

function createPointPhotosTemplate(pointDestination) {
  return (
    `<div class="event__photos-tape">
      ${pointDestination.pictures.reduce((acc, picture) =>
      acc.concat(`<img class="event__photo" src="${picture.src}" alt="${picture.description}">`), '')}
    </div>`
  );
}

function createPointTypesTemplate(currentType) {
  return TYPES.reduce((acc, type) =>
    acc.concat(`<div class="event__type-item">
      <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${currentType === type ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
    </div>`), '');
}

function createPointOffersTemplate(pointOffers) {
  return `<div class="event__available-offers">${pointOffers.reduce((acc, offer) =>
    acc.concat(`<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.title}-1" type="checkbox" name="event-offer-
          ${offer.title}" ${offer.isChecked ? 'checked' : ''}>
        <label class="event__offer-label" for="event-offer-${offer.title}-1">
          <span class="event__offer-title">${offer.title}</span>
                      &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
    </div>`), '')}
    </div>`;
}

function createEditPointTemplate(point) {
  const { basePrice, dateFrom, dateTo, destination, type, offers } = point;

  return (
    `<li class="trip-events__item">
        <form class="event event--edit" action="#" method="post">
            <header class="event__header">
                <div class="event__type-wrapper">
                  <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                  </label>
                  <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
                  <div class="event__type-list">
                    <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${createPointTypesTemplate(type)}
                    </fieldset>
                  </div>
                </div>
                <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                        ${type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
                    ${createPointCitiesOptionsTemplate()}
                </div>
                <div class="event__field-group  event__field-group--time">
                <label class="visually-hidden" for="event-start-time-1">From</label>
                <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFrom ? humanizeDate('DD/MM/YY HH:mm', dateFrom) : ''}">
                &mdash;
                <label class="visually-hidden" for="event-end-time-1">To</label>
                <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateTo ? humanizeDate('DD/MM/YY HH:mm', dateTo) : ''}">
                </div>
                <div class="event__field-group  event__field-group--price">
                <label class="event__label" for="event-price-1">
                    <span class="visually-hidden">Price</span>
                    &euro;
                </label>
                <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value=${basePrice ? basePrice : ''}>
                </div>
                <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                <button class="event__reset-btn" type="reset">Cancel</button>
                <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
            </header>
            <section class="event__details">
                <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                    ${createPointOffersTemplate(offers)}
                </section>
                <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${destination.description}</p>
                    <div class="event__photos-container">
                        ${createPointPhotosTemplate(destination)}
                    </div>
                </section>
            </section>
        </form>`);
}

export default class EditPointView extends AbstractStatefulView {
  #point = null;
  #onEditPointReset = null;
  #onEditPointSubmit = null;
  #onEditCheckedPoint = null;
  #onEditInputDestination = null;
  #onEditTypePoint = null;

  constructor({ point = POINT_EMPTY, onEditPointReset, onEditPointSubmit, onEditCheckedPoint,
    onEditInputDestination, onEditTypePoint
  }) {
    super();
    this.#point = point;
    this.#onEditPointReset = onEditPointReset;
    this.#onEditPointSubmit = onEditPointSubmit;
    this.#onEditCheckedPoint = onEditCheckedPoint;
    this.#onEditInputDestination = onEditInputDestination;
    this.#onEditTypePoint = onEditTypePoint;
    this._restoreHandlers();
  }

  _restoreHandlers() {
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editPointResetHandler);
    this.element.querySelector('form').addEventListener('submit', this.#editPointSubmitHandler);
    this.element.querySelector('.event__available-offers').addEventListener('change', this.#editCheckedPointHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#editPointInputHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#editTypePointHandler);
  }

  #editPointResetHandler = (evt) => {
    evt.preventDefault();
    this.#onEditPointReset();
  };

  #editPointSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#onEditPointSubmit();
  };

  #editCheckedPointHandler = (evt) => {
    evt.preventDefault();
    this.#onEditCheckedPoint(this.#point.offers, evt.currentTarget.attributes[0].ownerDocument.activeElement.id);
  };

  #editPointInputHandler = (evt) => {
    evt.preventDefault();
    this.#onEditInputDestination(evt.currentTarget.value);
  };

  #editTypePointHandler = (evt) => {
    evt.preventDefault();
    this.#onEditTypePoint(evt.target.value);
  };

  get template() {
    return createEditPointTemplate(this.#point);
  }
}
