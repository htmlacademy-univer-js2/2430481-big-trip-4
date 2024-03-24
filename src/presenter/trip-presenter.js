import SortView from '../view/sort-view.js';
import EditPointView from '../view/point-edit-view.js';
import PointView from '../view/point-view.js';
import TripView from '../view/point-list-view.js';
import { render, replace } from '../framework/render.js';

export default class TripPresenter {
  #tripContainer = null;
  #pointList = null;
  #destinationsModel = null;
  #offersModel = null;
  #points = [];

  constructor({ tripContainer, destinationsModel, offersModel, pointsModel }) {
    this.#tripContainer = tripContainer;
    this.#pointList = new TripView();
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#points = [...pointsModel.get()];
  }

  init() {
    render(new SortView(), this.#tripContainer);
    render(this.#pointList, this.#tripContainer);
    this.#points.forEach((point) => this.#renderPoint(point));
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
