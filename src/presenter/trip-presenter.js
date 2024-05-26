import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import LoadingView from '../view/loading-view';
// import FilterView from '../view/filter-view.js';
import EmptyListView from '../view/empty-list-view.js';
import TripInfoView from '../view/trip-info-view.js';
import PointPresenter from './point-presenter';
import FilterPresenter from './filter-presenter';
import NewPointPresenter from './new-point-presenter';
import FilterModel from '../model/filter-model';
import { sortByDay, sortByTime, sortByPrice } from '../utils/sort-utils';
import { FILTER } from '../utils/filter-utils';
import { render, RenderPosition, remove } from '../framework/render.js';
import { SORT_TYPES, MODE, USER_ACTION, UPDATE_TYPES, FILTER_TYPES } from '../const.js';

export default class TripPresenter {
  #tripContainer = null;
  #pointList = null;
  #pointModel = null;
  #pointPresenters = new Map();
  #currentSortType = SORT_TYPES.DAY;
  #sortComponent = null;
  #mode = MODE.DEFAULT;
  #filterModel = new FilterModel();
  #filterPresenter = null;
  #newPointPresenter = null;
  #tripInfoComponent = null;
  #emptyListComponent = null;
  #loadingComponent = new LoadingView();
  #isLoading = true;
  #newEvtButton = null;

  constructor({ tripContainer, pointModel }) {
    this.#tripContainer = tripContainer;
    this.#pointList = new PointListView();
    this.#pointModel = pointModel;
    this.#newEvtButton = this.#tripContainer.newEvtButton;
    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#newEvtButton.addEventListener('click', this.#createNewPointHandler);
  }

  init() {
    this.#renderBoard();
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#onSortTypeChange,
    });
    render(this.#sortComponent, this.#tripContainer.eventListElement);
  }

  #onSortTypeChange = (sortType) => {
    if (sortType === this.#currentSortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  #createNewPointHandler = (evt) => {
    evt.preventDefault();
    if (this.#mode !== MODE.CREATING) {
      this.#renderNewPoint();
      this.#newEvtButton.disabled = true;
    }
  };

  #renderNewPoint() {
    this.#mode = MODE.CREATING;
    this.#filterModel.setFilter(UPDATE_TYPES.MAJOR, FILTER_TYPES.EVERYTHING);
    this.#newPointPresenter = new NewPointPresenter({
      pointsListContainer: this.#pointList.element,
      onDataChange: this.#handleViewAction,
      onResetMode: this.#resetModeHandler,
      newEventBtn: this.#newEvtButton,
      mode: this.#mode
    });
    this.#newPointPresenter.init();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  }

  get points() {
    const filterType = this.#filterModel.filter;
    const points = this.#pointModel.points;
    const filteredPoints = FILTER[filterType](points);

    switch (this.#currentSortType) {
      case SORT_TYPES.DAY:
        return sortByDay([...filteredPoints]);
      case SORT_TYPES.TIME:
        return sortByTime([...filteredPoints]);
      case SORT_TYPES.PRICE:
        return sortByPrice([...filteredPoints]);
    }
    return filteredPoints;
  }

  #handleViewAction = (actionType, updateType, updatedPoint) => {
    switch (actionType) {
      case USER_ACTION.UPDATE_TASK:
        this.#pointModel.updatePoint(updateType, updatedPoint);
        break;
      case USER_ACTION.ADD_TASK:
        this.#pointModel.addPoint(updateType, updatedPoint);
        break;
      case USER_ACTION.DELETE_TASK:
        this.#pointModel.deletePoint(updateType, updatedPoint);
    }
  };

  #renderBoard() {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }
    this.#renderFilter();
    if (this.points.length === 0) {
      render(this.#pointList, this.#tripContainer.eventListElement);
    }

    if (this.points.length === 0 && this.#mode !== MODE.CREATING) {
      this.#emptyListComponent = new EmptyListView(this.#filterModel.filter);
      render(this.#emptyListComponent, this.#tripContainer.eventListElement);
      return;
    }

    if (this.points.length !== 0) {
      this.#tripInfoComponent = new TripInfoView(this.points, this.destinations);
      render(this.#tripInfoComponent, this.#tripContainer.tripMain, RenderPosition.AFTERBEGIN);
      this.#renderSort();
      render(this.#pointList, this.#tripContainer.eventListElement);
      this.points.forEach((point) => this.#renderPoint(point));
    }
  }

  #clearBoard({ resetSortType = false } = {}) {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#loadingComponent);
    remove(this.#emptyListComponent);
    remove(this.#tripInfoComponent);
    this.#filterPresenter.destroy();
    remove(this.#sortComponent);

    if (resetSortType) {
      this.#currentSortType = SORT_TYPES.DAY;
    }
  }

  #renderFilter() {
    this.#filterPresenter = new FilterPresenter({
      filterContainer: this.#tripContainer.filtersElement,
      filterModel: this.#filterModel,
      pointsModel: this.#pointModel,
    });
    this.#filterPresenter.init();
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#tripContainer.eventListElement, RenderPosition.AFTERBEGIN);
  }

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UPDATE_TYPES.PATCH:
        this.#pointPresenters.get(data.id).init(data, this.offers, this.destinations);
        break;
      case UPDATE_TYPES.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UPDATE_TYPES.MAJOR:
        this.#clearBoard({ resetSortType: true });
        this.#renderBoard();
        break;
      case UPDATE_TYPES.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
    }
  };

  #resetModeHandler = () => {
    this.#mode = MODE.DEFAULT;
    if (this.points.length === 0) {
      this.#emptyListComponent = new EmptyListView(this.#filterModel.filter);
      render(this.#emptyListComponent, this.#tripContainer.eventListElement);
    }
  };

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointsListContainer: this.#pointList.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModelEvent,
      mode: this.#mode
    });
    pointPresenter.init(point, this.offers, this.destinations);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  get destinations() {
    return this.#pointModel.destinations;
  }

  get offers() {
    return this.#pointModel.offers;
  }
}
