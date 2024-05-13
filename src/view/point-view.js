import AbstractView from '../framework/view/abstract-view.js';
import { humanizeDate, getPointDuration } from '../utils.js';

function createPointOffersTemplate(offers) {
  const offersList = offers.offers.reduce((acc, { title, price, isChecked }) => (acc += isChecked ?
    `<li class="event__offer">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
    </li>` : ''), '');
  return (
    `<ul class="event__selected-offers">
        ${offersList}
      </ul>`
  );
}

function createPointTemplate(point) {
  const { basePrice, dateFrom, dateTo, destination, isFavorite, type, offers } = point;
  const favoriteClass = isFavorite ? 'event__favorite-btn--active' : '';
  return `<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime=${humanizeDate('DD/MM/YY HH:mm', dateFrom)}>${humanizeDate('MMM DD', dateFrom)}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type} ${destination.name}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime=${humanizeDate('DD/MM/YY HH:mm', dateFrom)}>${humanizeDate('HH:mm', dateFrom)}</time>
        &mdash;
        <time class="event__end-time" datetime=${humanizeDate('DD/MM/YY HH:mm', dateTo)}>${humanizeDate('HH:mm', dateTo)}</time>
      </p>
      <p class="event__duration">${getPointDuration(point)}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${basePrice ? basePrice : ''}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    ${createPointOffersTemplate({ offers })}
    <button class="event__favorite-btn ${favoriteClass}" type="button">
    <button class="event__favorite-btn event__favorite-btn--active" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`;
}

export default class PointView extends AbstractView {
  #point = null;
  #onEditClick = null;
  #onFavoriteClick = null;

  get template() {
    return createPointTemplate(this.#point);
  }

  constructor({ point, onEditClick, onFavoriteClick }) {
    super();
    this.#point = point;
    this.#onEditClick = onEditClick;
    this.#onFavoriteClick = onFavoriteClick;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#onEditClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#onFavoriteClick();
  };
}
