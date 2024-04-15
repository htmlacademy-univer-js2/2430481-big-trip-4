import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import FilterView from '../view/filter-view.js';
import EmptyListView from '../view/empty-list-view.js';
import TripInfoView from '../view/trip-info-view.js';
import PointPresenter from './point-presenter';
import { updateItems } from '../utils';
import { render, RenderPosition } from '../framework/render.js';

export default class TripPresenter {
  #tripContainer = null;
  #pointList = null;
  #destinationsModel = null;
  #offersModel = null;
  #points = [];
  #pointPresenters = new Map();

  constructor({ tripContainer, destinationsModel, offersModel, pointsModel }) {
    this.#tripContainer = tripContainer;
    this.#pointList = new PointListView();
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#points = [...pointsModel.get()];
    this.#points.sort((a, b) => a.dateFrom - b.dateFrom);
  }

  init() {
    render(new FilterView(this.#points.length), this.#tripContainer.filtersElement);
    if (this.#points.length > 0) {
      render(new TripInfoView(this.#points), this.#tripContainer.tripMain, RenderPosition.AFTERBEGIN);
      render(new SortView(), this.#tripContainer.eventListElement);
      render(this.#pointList, this.#tripContainer.eventListElement);
      this.#points.forEach((point) => this.#renderPoint(point));
    } else {
      render(new EmptyListView(), this.#tripContainer.eventListElement);
    }
  }

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
