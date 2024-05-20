import dayjs from 'dayjs';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { humanizeDate } from '../utils.js';
import { getDefaultPoint } from '../mock/point.js';
import { generateDestination } from '../mock/destination';
import { OFFERS, CITIES, POINT_TYPES, MODE } from '../const';

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
  return POINT_TYPES.reduce((acc, type) =>
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
                <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value=${basePrice ? basePrice : ''}>
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

// export default class EditPointView extends AbstractStatefulView {
//   #initPointValue = null;
//   #onEditPointReset = null;
//   #onEditSavePoint = null;
//   #datepickerForStart = null;
//   #datepickerForEnd = null;
//   #onPointDelete = null;
//   #mode = null;

//   constructor({ point = getDefaultPoint(), onEditPointReset, onEditPointSave, onEditDeletePoint, mode = MODE.EDITING }) {
//     super();
//     this._setState(point);
//     this.#initPointValue = JSON.parse(JSON.stringify(point));
//     this.#onEditPointReset = onEditPointReset;
//     this.#onEditSavePoint = onEditPointSave;
//     this.#onPointDelete = onEditDeletePoint;
//     this.#mode = mode;
//     this._restoreHandlers();
//   }

//   get template() {
//     return createEditPointTemplate(this._state);
//   }

//   _restoreHandlers() {
//     if (this.#mode === MODE.EDITING) {
//       this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editPointResetHandler);
//     }
//     this.element.querySelector('.event__type-group').addEventListener('change', this.#editTypePointHandler);
//     this.element.querySelector('.event__input--destination').addEventListener('change', this.#editInputPointHandler);
//     this.element.querySelector('.event__input--price').addEventListener('change', this.#editPricePointHandler);
//     this.element.querySelector('.event__available-offers').addEventListener('change', this.#editCheckedPointHandler);
//     this.element.querySelector('.event__save-btn').addEventListener('click', this.#editPointSaveHandler);
//     this.element.querySelector('.event__reset-btn').addEventListener('click', this.#editDeletePointHandler);
//     this.#setFlatpickr();
//   }
// }

// #setFlatpickr() {
//   const commonConfig = {
//     enableTime: true,
//     dateFormat: 'd/m/y H:i',
//     'time_24hr': true,
//     locale: {
//       firstDayOfWeek: 1,
//     }
//   };

//   this.#datepickerForStart = flatpickr(
//     this.element.querySelectorAll('.event__input--time')[0],
//     {
//       ...commonConfig,
//       defaultDate: dayjs(this._state.dateFrom).format('DD/MM/YY HH:mm'),
//       onClose: this.#editStartDateChangeHandler,
//     }
//   );

//   this.#datepickerForEnd = flatpickr(
//     this.element.querySelectorAll('.event__input--time')[1],
//     {
//       ...commonConfig,
//       defaultDate: dayjs(this._state.dateTo).format('DD/MM/YY HH:mm'),
//       onClose: this.#editEndDateChangeHandler,
//     }
//   );
// }

// #editStartDateChangeHandler = ([fullStartDate]) => {
//   const startTime = dayjs(fullStartDate).format('YYYY-MM-DDTHH:mm');
//   this._setState({
//     ...this._state,
//     dateFrom: startTime
//   });
// };

// #editEndDateChangeHandler = ([fullDate]) => {
//   const endTime = dayjs(fullDate).format('YYYY-MM-DDTHH:mm');
//   this._setState({
//     ...this._state,
//     dateTo: endTime
//   });
// };

// removeElement() {
//   super.removeElement();

//   if (this.#datepickerForStart) {
//     this.#datepickerForStart = null;
//   }

//   if (this.#datepickerForEnd) {
//     this.#datepickerForEnd = null;
//   }
// }

// #editPointResetHandler = (evt) => {
//   evt.preventDefault();
//   this.#onEditPointReset(this.#initPointValue);
// };

// #editPointSubmitHandler = (evt) => {
//   evt.preventDefault();
//   this.#onEditSavePoint(this._state);
// };

// #editCheckedPointHandler = (evt) => {
//   evt.preventDefault();
//   const offers = this._state.offers;
//   const cleanCheckedOffer = evt.currentTarget.attributes[0].ownerDocument.activeElement.id.split('-')[2];
//   const number = offers.findIndex((item) => item.title === cleanCheckedOffer);
//   offers[number].isChecked = !offers[number].isChecked;
//   this._setState({
//     ...this._state,
//     offers,
//   });
// };

// #editPointInputHandler = (evt) => {
//   evt.preventDefault();
//   this.updateElement({
//     destination: generateDestination(evt.currentTarget.value)
//   });
// };

// #editTypePointHandler = (evt) => {
//   evt.preventDefault();
//   const typePoint = evt.target.value;
//   const newOffers = OFFERS.get(typePoint).map((item) => {
//     item.isChecked = false;
//     return item;
//   });
//   this.updateElement({
//     type: typePoint,
//     offers: newOffers,
//   });
// };

// #priceChangeHandler = (evt) => {
//   this.updateElement({
//     basePrice: evt.target.value,
//   });
// };
// }

export default class EditPointView extends AbstractStatefulView {
  #oldState = null;
  #handleEditPointReset = null;
  #handleEditPointSave = null;
  #handleEditDeletePoint = null;
  #datepickerForStart = null;
  #datepickerForEnd = null;
  #mode = null;

  constructor({ point = getDefaultPoint(), onEditPointReset, onEditPointSave, onEditDeletePoint, mode = MODE.EDITING }) {
    super();
    this._setState(point);
    this.#oldState = JSON.parse(JSON.stringify(point));
    this.#handleEditPointReset = onEditPointReset;
    this.#handleEditPointSave = onEditPointSave;
    this.#handleEditDeletePoint = onEditDeletePoint;
    this.#mode = mode;

    this._restoreHandlers();
  }

  get template() {
    return createEditPointTemplate(this._state, this.#mode);
  }

  _restoreHandlers() {
    if (this.#mode === MODE.EDITING) {
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editPointResetHandler);
    }
    this.element.querySelector('.event__type-group').addEventListener('change', this.#editTypePointHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#editInputPointHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#editPricePointHandler);
    this.element.querySelector('.event__available-offers').addEventListener('change', this.#editCheckedPointHandler);
    this.element.querySelector('.event__save-btn').addEventListener('click', this.#editPointSaveHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#editDeletePointHandler);
    this.#setFlatpickr();
  }

  #setFlatpickr() {
    const commonConfig = {
      enableTime: true,
      dateFormat: 'd/m/y H:i',
      'time_24hr': true,
      locale: {
        firstDayOfWeek: 1,
      }
    };
    this.#datepickerForStart = flatpickr(
      this.element.querySelectorAll('.event__input--time')[0],
      {
        ...commonConfig,
        defaultDate: dayjs(this._state.dateFrom).format('DD/MM/YY HH:mm'),
        onClose: this.#editDateFromChangeHandler,
      }
    );

    this.#datepickerForEnd = flatpickr(
      this.element.querySelectorAll('.event__input--time')[1],
      {
        ...commonConfig,
        defaultDate: dayjs(this._state.dateTo).format('DD/MM/YY HH:mm'),
        onClose: this.#editDateToChangeHandler,
      }
    );
  }

  #editDateFromChangeHandler = ([fullStartDate]) => {
    const dateFrom = dayjs(fullStartDate).format('YYYY-MM-DDTHH:mm');
    this._setState({
      ...this._state,
      dateFrom,
      dateTo: this._state.dateTo
    });
  };

  #editDateToChangeHandler = ([fullEndDate]) => {
    const dateTo = dayjs(fullEndDate).format('YYYY-MM-DDTHH:mm');
    this._setState({
      ...this._state,
      dateFrom: this._state.dateFrom,
      dateTo
    });
  };

  #editTypePointHandler = (evt) => {
    evt.preventDefault();
    const typePoint = evt.target.value;
    const offers = OFFERS.get(typePoint);
    const newOffers = offers.map((item) => {
      item[2] = false;
      return item;
    });
    this.updateElement({
      type: typePoint,
      offers: newOffers,
    });
  };

  #editInputPointHandler = (evt) => {
    evt.preventDefault();
    const currentCity = evt.currentTarget.value;
    const id = Array.from(CITIES.values()).indexOf(currentCity);
    if (id === -1) {
      return;
    }

    this.updateElement({
      city: currentCity,
      destination: generateDestination(currentCity),
    });
  };

  #editPricePointHandler = (evt) => {
    evt.preventDefault();
    const basePrice = Number(evt.currentTarget.value);
    this.updateElement({
      basePrice,
    });
  };

  #editPointSaveHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditPointSave(this._state);
  };

  #editDeletePointHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditDeletePoint(this._state);
  };

  #editPointResetHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditPointReset(this.#oldState);
  };

  #editCheckedPointHandler = (evt) => {
    evt.preventDefault();
    const offers = this._state.offers;
    const cleanCheckedOffer = evt.currentTarget.attributes[0].ownerDocument.activeElement.id.split('-')[2];
    const number = offers.findIndex((item) => item.title === cleanCheckedOffer);
    offers[number].isChecked = !offers[number].isChecked;
    this._setState({
      ...this._state,
      offers,
    });
  };
}
