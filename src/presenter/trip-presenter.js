import SortView from '../view/sort-view.js';
import EditPointView from '../view/point-edit-view.js';
import PointView from '../view/point-view.js';
import PointListView from '../view/point-list-view.js';
import FilterView from '../view/filter-view.js';
import EmptyListView from '../view/empty-list-view.js';
import TripInfoView from '../view/trip-info-view.js';
import { render, replace, RenderPosition } from '../framework/render.js';

export default class TripPresenter {
  #tripContainer = null;
  #pointList = null;
  #destinationsModel = null;
  #offersModel = null;
  #points = [];

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
      this.#points.forEach((point) => this.#renderPoint(point));
      render(new TripInfoView(this.#points), this.#tripContainer.tripMain, RenderPosition.AFTERBEGIN);
      render(new SortView(), this.#tripContainer.eventListElement);
      render(this.#pointList, this.#tripContainer.eventListElement);
    } else {
      render(new EmptyListView(), this.#tripContainer.eventListElement);
    }
  }

  #renderPoint(point) {
    const pointComponent = new PointView({
      point,
      destination: this.#destinationsModel.getById(point.destination),
      offers: this.#offersModel.getByType(point.type),
      onEditClick: onEditPointClick,
    });

    const editPointComponent = new EditPointView({
      point,
      destination: this.#destinationsModel.getById(point.destination),
      offers: this.#offersModel.getByType(point.type),
      onEditReset: onEditPointReset,
      onEditSubmit: onEditPointSubmit,
    });

    const onDocumentEscKeydown = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replace(pointComponent, editPointComponent);
        document.removeEventListener('keydown', onDocumentEscKeydown);
      }
    };

    function onEditPointClick() {
      replace(editPointComponent, pointComponent);
      document.addEventListener('keydown', onDocumentEscKeydown);
    }

    function onEditPointReset() {
      replace(pointComponent, editPointComponent);
      document.removeEventListener('keydown', onDocumentEscKeydown);
    }

    function onEditPointSubmit() {
      replace(pointComponent, editPointComponent);
      document.removeEventListener('keydown', onDocumentEscKeydown);
    }

    render(pointComponent, this.#pointList.element);
  }
}
