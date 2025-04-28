import { render } from '../framework/render.js';
import NewPointButtonView from '../view/new-point-button-view.js';

export default class NewPointButtonPresenter {
  #container = null;
  #button = null;
  #clickAction = null;

  constructor({container}) {
    this.#container = container;
  }

  init({onNewPointButtonClick}) {
    this.#clickAction = onNewPointButtonClick;

    this.#button = new NewPointButtonView({onNewPointButtonClick: this.#onNewPointButtonClick});
    render(this.#button, this.#container);
  }

  disableButton() {
    this.#button.setDisabled(true);
  }

  enableButton() {
    this.#button.setDisabled(false);
  }

  #onNewPointButtonClick = () => {
    this.#clickAction();
  };
}
