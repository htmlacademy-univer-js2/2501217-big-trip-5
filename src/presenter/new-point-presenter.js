import { ACTIONS, UPDATE_TYPES, FORM_TYPE } from '../const.js';
import { remove, render, RenderPosition } from '../framework/render';
import EditFormView from '../view/edit-form-view.js';

export default class NewPointPresenter {
  #container = null;
  #pointNewComponent = null;
  #pointsListModel = null;
  #onDataChange = null;
  #onDestroy = null;

  constructor({container, pointsListModel, onDataChange, onDestroy}) {
    this.#container = container;
    this.#pointsListModel = pointsListModel;
    this.#onDataChange = onDataChange;
    this.#onDestroy = onDestroy;
  }

  init() {
    if(this.#pointNewComponent !== null) {
      return;
    }

    this.#pointNewComponent = new EditFormView({
      destinations: this.#pointsListModel.destinations,
      offers: this.#pointsListModel.offers,
      onRollButtonClick: this.#onResetClick,
      onSubmitButtonClick: this.#onSubmitButtonClick,
      onResetClick: this.#onResetClick,
      type: FORM_TYPE.CREATE,
    });

    render(this.#pointNewComponent, this.#container, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#onEscKeydown);
  }

  destroy = ({isCanceled = true} = {}) => {
    if (this.#pointNewComponent === null) {
      return;
    }

    this.#onDestroy({isCanceled});

    remove(this.#pointNewComponent);
    this.#pointNewComponent = null;
    document.removeEventListener('keydown', this.#onEscKeydown);
  };

  setSaving() {
    this.#pointNewComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#pointNewComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointNewComponent.shake(resetFormState);
  }

  #onSubmitButtonClick = (point) => {
    this.#onDataChange(
      ACTIONS.ADD_POINT,
      UPDATE_TYPES.MINOR,
      point,
    );
  };

  #onResetClick = () => {
    this.destroy();
  };

  #onEscKeydown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.destroy();
    }
  };
}
