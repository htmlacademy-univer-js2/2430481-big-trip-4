import PointView from '../view/point-view';
import EditPointView from '../view/point-edit-view';
import { remove, render, replace } from '../framework/render';
import { USER_ACTION, UPDATE_TYPES, MODE } from '../const';
import dayjs from 'dayjs';

export default class PointPresenter {
  #point = null;
  #allOffers = [];
  #allDestinations = [];
  #pointComponent = null;
  #editPointComponent = null;
  #pointsListContainer = null;
  #handleDataChange = null;
  #handleModeChange = null;
  #mode = MODE.DEFAULT;

  constructor({ pointsListContainer, onDataChange, onModeChange }) {
    this.#pointsListContainer = pointsListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point, allOffers, allDestinations) {
    this.#point = point;
    this.#allOffers = allOffers;
    this.#allDestinations = allDestinations;
    const prevPointComponent = this.#pointComponent;
    const prevEditPointComponent = this.#editPointComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      allOffers: this.#allOffers,
      allDestinations: this.#allDestinations,
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#editPointComponent = new EditPointView({
      point: this.#point,
      allOffers: this.#allOffers,
      allDestinations: this.#allDestinations,
      onEditPointReset: this.#handleEditPointReset,
      onEditPointSave: this.#handleEditPointSave,
      onEditDeletePoint: this.#handleEditDeletePoint,
    });

    if (!prevPointComponent || !prevEditPointComponent) {
      render(this.#pointComponent, this.#pointsListContainer);
      return;
    }
    if (this.#mode === MODE.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }
    if (this.#mode === MODE.EDITING) {
      replace(this.#editPointComponent, prevEditPointComponent);
    }
    remove(prevPointComponent);
    remove(prevEditPointComponent);
  }

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#editPointComponent);
  };

  resetView = () => {
    if (this.#mode !== MODE.DEFAULT) {
      this.#replaceFormToPoint();
    }
  };

  #replacePointToForm = () => {
    replace(this.#editPointComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeydown);
    this.#handleModeChange();
    this.#mode = MODE.EDITING;
  };

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#editPointComponent);
    document.removeEventListener('keydown', this.#escKeydown);
    this.#mode = MODE.DEFAULT;
  };

  #escKeydown = (evt) => {
    if (evt.key === 'Esc' || evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
  };

  #handleEditClick = () => {
    this.#replacePointToForm();
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange(
      USER_ACTION.UPDATE_TASK,
      UPDATE_TYPES.PATCH,
      { ...this.#point, isFavorite: !this.#point.isFavorite }
    );
  };

  #handleEditPointReset = (oldPoint) => {
    this.#replaceFormToPoint();
    this.#handleEditPointSave(oldPoint);
  };

  #handleEditPointSave = (updatedPoint) => {
    const isMinorUpdate = dayjs(updatedPoint.dateFrom).isSame(this.#point.dateFrom)
      || dayjs(updatedPoint.dateTo).isSame(this.#point.dateTo)
      || updatedPoint.price === this.#point.price;

    this.#handleDataChange(
      USER_ACTION.UPDATE_TASK,
      isMinorUpdate ? UPDATE_TYPES.MINOR : UPDATE_TYPES.PATCH,
      updatedPoint,
    );
  };

  #handleEditDeletePoint = (updatedPoint) => {
    this.#handleDataChange(
      USER_ACTION.DELETE_TASK,
      UPDATE_TYPES.MINOR,
      updatedPoint,
    );
  };
}
