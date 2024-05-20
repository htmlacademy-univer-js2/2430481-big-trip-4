// import PointView from '../view/point-view';
// import EditPointView from '../view/point-edit-view';
// import { MODE, UPDATE_TYPES, USER_ACTION } from '../const';
// import { remove, render, replace } from '../framework/render';

// export default class PointPresenter {
//   #point = null;
//   #pointComponent = null;
//   #editPointComponent = null;
//   #pointsListContainer = null;
//   #onDataChange = null;
//   #onModeChange = null;
//   #mode = null;

//   constructor({ pointsListContainer, onDataChange, onModeChange, mode }) {
//     this.#pointsListContainer = pointsListContainer;
//     this.#onDataChange = onDataChange;
//     this.#onModeChange = onModeChange;
//     this.#mode = mode;
//   }

//   init(point) {
//     this.#point = point;
//     const prevPointComponent = this.#pointComponent;
//     const prevEditPointComponent = this.#editPointComponent;

//     this.#pointComponent = new PointView({
//       point: this.#point,
//       onEditClick: this.#onEditClick,
//       onFavoriteClick: this.#onFavoriteClick,
//     });
//     this.#editPointComponent = new EditPointView({
//       point: this.#point,
//       onEditPointReset: this.#onEditPointReset,
//       onEditPointSubmit: this.#onEditPointSubmit,
//       onEditSavePoint: this.#onEditSavePoint,
//     });

//     if (!prevPointComponent || !prevEditPointComponent) {
//       render(this.#pointComponent, this.#pointsListContainer);
//       return;
//     }

//     if (this.#mode === MODE.DEFAULT) {
//       replace(this.#pointComponent, prevPointComponent);
//     }

//     if (this.#mode === MODE.EDITING) {
//       replace(this.#editPointComponent, prevEditPointComponent);
//     }

//     remove(prevPointComponent);
//     remove(prevEditPointComponent);
//   }

//   destroy = () => {
//     remove(this.#pointComponent);
//     remove(this.#editPointComponent);
//   };

//   resetView = () => {
//     if (this.#mode !== MODE.DEFAULT) {
//       this.#replaceFormToPoint();
//     }
//   };

//   #replaceFormToPoint = () => {
//     replace(this.#pointComponent, this.#editPointComponent);
//     document.removeEventListener('keydown', this.#escKeydown);
//     this.#mode = MODE.DEFAULT;
//   };

//   #escKeydown = (evt) => {
//     if (evt.key === 'Esc' || evt.key === 'Escape') {
//       evt.preventDefault();
//       this.#replaceFormToPoint();
//     }
//   };

//   #onEditClick = () => {
//     replace(this.#editPointComponent, this.#pointComponent);
//     document.addEventListener('keydown', this.#escKeydown);
//     this.#onModeChange();
//     this.#mode = MODE.EDITING;
//   };

//   #onEditPointReset = (point) => {
//     this.#replaceFormToPoint();
//     this.#onEditSavePoint(point);
//   };

//   #onEditPointSubmit = () => {
//     if (this.newType) {
//       this.point.type = this.newType;
//       this.newType = null;
//     }
//     this.#replaceFormToPoint();
//   };

//   #onFavoriteClick = () => {
//     this.#onDataChange(
//       USER_ACTION.UPDATE_TASK,
//       UPDATE_TYPES.PATCH,
//       {
//         ...this.#point,
//         isFavorite: !this.#point.isFavorite,
//       });
//   };

//   #onEditSavePoint = (point) => {
//     this.#onDataChange({
//       ...point,
//     });
//   };
// }
import PointView from '../view/point-view';
import EditPointView from '../view/point-edit-view';
import { remove, render, replace } from '../framework/render';
import { USER_ACTION, UPDATE_TYPES, MODE } from '../const';
import dayjs from 'dayjs';

export default class PointPresenter {
  #point = null;
  #pointComponent = null;
  #editPointComponent = null;
  #pointsListContainer = null;
  #handleDataChange = null;
  #handleModeChange = null;
  #mode = null;

  constructor({ pointsListContainer, onDataChange, onModeChange, mode }) {
    this.#pointsListContainer = pointsListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
    this.#mode = mode;
  }

  init(point) {
    this.#point = point;
    const prevPointComponent = this.#pointComponent;
    const prevEditPointComponent = this.#editPointComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#editPointComponent = new EditPointView({
      point: this.#point,
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
