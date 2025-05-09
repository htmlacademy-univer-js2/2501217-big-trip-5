import TripInfoView from '../view/trip-info-view.js';
import { render, replace } from '../framework/render.js';
import { RenderPosition } from '../framework/render.js';

export default class TripInfoPresenter {
  #container = null;
  #pointsListModel = null;
  #tripInfoComponent = null;

  constructor({ container, pointsListModel }) {
    this.#container = container;
    this.#pointsListModel = pointsListModel;
    this.#pointsListModel.addObserver(this.#onPointListModelChange);
  }

  init() {
    this.#renderTripInfo();
  }

  #onPointListModelChange = () => {
    this.#renderTripInfo();
  };

  #renderTripInfo() {
    const prevComponent = this.#tripInfoComponent;
    this.#tripInfoComponent = new TripInfoView(this.#pointsListModel.points, this.#pointsListModel.destinations, this.#pointsListModel.offers);

    if (prevComponent === null) {
      render(this.#tripInfoComponent, this.#container, RenderPosition.AFTERBEGIN);
    } else {
      replace(this.#tripInfoComponent, prevComponent);
    }
  }
}
