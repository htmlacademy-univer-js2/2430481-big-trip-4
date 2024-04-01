import AbstractView from '../framework/view/abstract-view.js';

function createFilterTemplate(pointsCount) {
  const defaultForFirstFilter = pointsCount > 0 ? 'checked' : 'disabled';
  const defaultForOtherFilter = pointsCount > 0 ? '' : 'disabled';

  return (
    `<form class="trip-filters" action="#" method="get">
    <div class="trip-filters__filter">
      <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" ${defaultForFirstFilter}>
      <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future" ${defaultForOtherFilter}>
      <label class="trip-filters__filter-label" for="filter-future">Future</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-present" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="present" ${defaultForOtherFilter}>
      <label class="trip-filters__filter-label" for="filter-present">Present</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" ${defaultForOtherFilter}>
      <label class="trip-filters__filter-label" for="filter-past">Past</label>
    </div>

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`
  );
}

export default class FilterView extends AbstractView {
  #pointsCount = 0;

  constructor(pointsCount) {
    super();
    this.#pointsCount = pointsCount;
  }

  get template() {
    return createFilterTemplate(this.#pointsCount);
  }
}
