import PointView from '../view/point-view';
import EditPointView from '../view/point-edit-view';
import { MODE } from '../const';
import { remove, render, replace } from '../framework/render';

export default class PointPresenter {
  #point = null;
  #pointComponent = null;
  #editPointComponent = null;
  #pointsListContainer = null;
  #onDataChange = null;
  #onModeChange = null;
  #mode = MODE.DEFAULT;

  constructor({ pointsListContainer, onDataChange, onModeChange }) {
    this.#pointsListContainer = pointsListContainer;
    this.#onDataChange = onDataChange;
    this.#onModeChange = onModeChange;
  }

  init(point) {
    this.#point = point;
    const prevPointComponent = this.#pointComponent;
    const prevEditPointComponent = this.#editPointComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      onEditClick: this.#onEditClick,
      onFavoriteClick: this.#onFavoriteClick,
    });
    this.#editPointComponent = new EditPointView({
      point: this.#point,
      onEditPointReset: this.#onEditPointReset,
      onEditPointSubmit: this.#onEditPointSubmit,
      onEditSavePoint: this.#onEditSavePoint,
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

  #onEditClick = () => {
    replace(this.#editPointComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeydown);
    this.#onModeChange();
    this.#mode = MODE.EDITING;
  };

  #onEditPointReset = (point) => {
    this.#replaceFormToPoint();
    this.#onEditSavePoint(point);
  };

  #onEditPointSubmit = () => {
    if (this.newType) {
      this.point.type = this.newType;
      this.newType = null;
    }
    this.#replaceFormToPoint();
  };

  #onFavoriteClick = () => {
    this.#onDataChange({
      ...this.#point,
      isFavorite: !this.#point.isFavorite,
    });
  };

  #onEditSavePoint = (point) => {
    this.#onDataChange({
      ...point,
    });
  };
}
