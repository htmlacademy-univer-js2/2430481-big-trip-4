import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import FilterView from '../view/filter-view.js';
import EmptyListView from '../view/empty-list-view.js';
import TripInfoView from '../view/trip-info-view.js';
import PointPresenter from './point-presenter';
import { updateItems, sortByDay, sortByPrice, sortByTime } from '../utils';
import { render, RenderPosition } from '../framework/render.js';
import { SORT_TYPE } from '../const.js';

export default class TripPresenter {
  #tripContainer = null;
  #pointList = null;
  #destinationsModel = null;
  #offersModel = null;
  #points = [];
  #pointPresenters = new Map();
  #currentSortType = SORT_TYPE.DAY;
  #sortComponent = null;

  constructor({ tripContainer, destinationsModel, offersModel, pointsModel }) {
    this.#tripContainer = tripContainer;
    this.#pointList = new PointListView();
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#points = [...pointsModel.get()];
    this.#points.sort((a, b) => a.dateFrom - b.dateFrom);
  }

  init() {
    this.#points = sortByDay(this.#points);
    render(new FilterView(this.#points.length), this.#tripContainer.filtersElement);
    if (this.#points.length > 0) {
      render(new TripInfoView(this.#points), this.#tripContainer.tripMain, RenderPosition.AFTERBEGIN);
      this.#renderSort();
      render(this.#pointList, this.#tripContainer.eventListElement);
      this.#points.forEach((point) => this.#renderPoint(point));
    } else {
      render(new EmptyListView(), this.#tripContainer.eventListElement);
    }
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#onSortTypeChange,
    });
    render(this.#sortComponent, this.#tripContainer.eventListElement);
  }

  #onSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortPoints(sortType);
    this.#clearPointsList();
    this.#points.forEach((point) => this.#renderPoint(point));
  };

  #sortPoints = (sortType) => {
    switch (sortType) {
      case SORT_TYPE.DAY:
        this.#points = sortByDay(this.#points);
        break;
      case SORT_TYPE.TIME:
        this.#points = sortByTime(this.#points);
        break;
      case SORT_TYPE.PRICE:
        this.#points = sortByPrice(this.#points);
        break;
    }

    this.#currentSortType = sortType;
  };

  #clearPointsList = () => {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  };

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointsListContainer: this.#pointList.element,
      onDataChange: this.#onDataChange,
      onModeChange: this.#onModeChange,
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #onDataChange = (updatedPoint) => {
    this.#points = updateItems(this.#points, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #onModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };
}
