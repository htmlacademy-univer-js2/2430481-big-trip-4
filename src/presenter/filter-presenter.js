import FilterView from '../view/filter-view';
import { UPDATE_TYPES } from '../const.js';
import { remove, render, replace } from '../framework/render';

export default class FilterPresenter {
  #filterModel = null;
  #pointsModel = null;
  #filterComponent = null;
  #filterContainer = null;

  constructor({ filterContainer, filterModel, pointsModel }) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#pointsModel = pointsModel;
    this.#filterModel.addObserver(this.#modelEventHandler);
    this.#pointsModel.addObserver(this.#modelEventHandler);
  }

  init() {
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView({
      allPoints: this.#pointsModel.points,
      currentFilterType: this.#filterModel.filter,
      onFilterTypeChange: this.#filterTypeChangeHandler,
    });

    if (!prevFilterComponent) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #modelEventHandler = () => {
    this.init();
  };

  #filterTypeChangeHandler = (filterType) => {
    if (filterType === this.#filterModel.filter) {
      return;
    }

    this.#filterModel.setFilter(UPDATE_TYPES.MAJOR, filterType);
  };

  destroy() {
    remove(this.#filterComponent);
  }
}
