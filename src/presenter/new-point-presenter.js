import EditPointView from '../view/point-edit-view';
import { RenderPosition, remove, render } from '../framework/render';
import { USER_ACTION, UPDATE_TYPES } from '../const';

export default class NewPointPresenter {
  #pointsListContainer = null;
  #editPointComponent = null;
  #handleDataChange = null;
  #resetModeHandler = null;
  #newEventBtn = null;
  #mode = null;

  constructor({ pointsListContainer, onDataChange, onResetMode, newEventBtn, mode }) {
    this.#pointsListContainer = pointsListContainer;
    this.#handleDataChange = onDataChange;
    this.#resetModeHandler = onResetMode;
    this.#newEventBtn = newEventBtn;
    this.#mode = mode;
  }

  init() {
    if (this.#editPointComponent) {
      return;
    }

    this.#editPointComponent = new EditPointView({
      onEditPointSave: this.#handleEditPointSave,
      onEditDeletePoint: this.#handleEditCancelPoint,
      mode: this.#mode,
    });

    render(this.#editPointComponent, this.#pointsListContainer, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (!this.#editPointComponent) {
      return;
    }

    this.#newEventBtn.disabled = false;
    this.#resetModeHandler();
    remove(this.#editPointComponent);
    this.#editPointComponent = null;
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleEditPointSave = (updatedPoint) => {
    this.destroy();
    this.#handleDataChange(
      USER_ACTION.ADD_TASK,
      UPDATE_TYPES.MAJOR,
      updatedPoint
    );
  };

  #handleEditCancelPoint = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
