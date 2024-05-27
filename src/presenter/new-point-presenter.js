import EditPointView from '../view/point-edit-view';
import { RenderPosition, remove, render } from '../framework/render';
import { MODE, USER_ACTION, UPDATE_TYPES } from '../const';

export default class NewPointPresenter {
  #mode = MODE.CREATING;
  #pointsListContainer = null;
  #allOffers = [];
  #allDestinations = [];
  #editPointComponent = null;
  #handleDataChange = null;
  #resetModeHandler = null;
  #newEventBtn = null;

  constructor({ pointsListContainer, onDataChange, onResetMode, newEventBtn }) {
    this.#pointsListContainer = pointsListContainer;
    this.#handleDataChange = onDataChange;
    this.#resetModeHandler = onResetMode;
    this.#newEventBtn = newEventBtn;
  }

  init(allOffers, allDestinations) {
    if (this.#editPointComponent) {
      return;
    }

    this.#allOffers = allOffers;
    this.#allDestinations = allDestinations;

    this.#editPointComponent = new EditPointView({
      allOffers: this.#allOffers,
      allDestinations: this.#allDestinations,
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

  setSaving() {
    this.#editPointComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#editPointComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#editPointComponent.shake(resetFormState);
  }

  #handleEditPointSave = (updatedPoint) => {
    this.#handleDataChange(
      USER_ACTION.ADD_TASK,
      UPDATE_TYPES.MAJOR,
      updatedPoint
    );
    this.destroy();
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
