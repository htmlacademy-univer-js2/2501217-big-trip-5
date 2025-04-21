import AbstractView from '../framework/view/abstract-view.js';

function createNewEventButtonTemplate() {
  return `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">
  New event</button>`;
}

export default class NewPointButtonView extends AbstractView {
  #clickAction = null;

  constructor({onNewPointButtonClick}) {
    super();
    this.#clickAction = onNewPointButtonClick;
    this.element.addEventListener('click', this.#onNewPointButtonClick);
  }

  get template() {
    return createNewEventButtonTemplate();
  }

  setDisabled = (isDisabled) => {
    this.element.disabled = isDisabled;
  };

  #onNewPointButtonClick = (evt) => {
    evt.preventDefault();
    this.#clickAction();
  };
}
