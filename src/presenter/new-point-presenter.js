import { ACTIONS, UPDATE_TYPES, FORM_TYPE } from '../const.js';
import { remove, render, RenderPosition } from '../framework/render';
import EditFormView from '../view/edit-form-view.js';

export default class NewPointPresenter {
  #container = null;
  #pointNewComponent = null;
  #pointsModel = null;
  #onDataChange = null;
  #onDestroy = null;

  constructor({container, pointsModel, onDataChange, onDestroy}) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#onDataChange = onDataChange;
    this.#onDestroy = onDestroy;
  }

  init() {
    if(this.#pointNewComponent !== null) {
      return;
    }

    this.#pointNewComponent = new EditFormView({
      destinations: this.#pointsModel.destinations,
      offers: this.#pointsModel.offers,
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

    remove(this.#pointNewComponent);
    this.#pointNewComponent = null;
    document.removeEventListener('keydown', this.#onEscKeydown);

    this.#onDestroy({isCanceled});
  };

  #onSubmitButtonClick = (point) => {
    this.#onDataChange(
      ACTIONS.ADD_POINT,
      UPDATE_TYPES.MINOR,
      point
    );
    this.destroy({isCanceled: false});
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
