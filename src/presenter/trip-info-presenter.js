import TripInfoView from '../view/trip-info-view.js';
import { render, replace, RenderPosition } from '../framework/render.js';

export default class TripInfoPresenter {
  #containerElement;
  #pointsListModel;
  #component;

  constructor({ containerElement, pointsListModel }) {
    this.#containerElement = containerElement;
    this.#pointsListModel = pointsListModel;
    this.#pointsListModel.addObserver(this.#modelChangeHandler);
  }

  init() {
    const previousComponent = this.#component;
    this.#component = new TripInfoView(this.#pointsListModel.points, this.#pointsListModel.destinations, this.#pointsListModel.offers);

    if (!previousComponent) {
      render(this.#component, this.#containerElement, RenderPosition.AFTERBEGIN);
    } else {
      replace(this.#component, previousComponent);
    }
  }

  #modelChangeHandler = () => this.init();
}
