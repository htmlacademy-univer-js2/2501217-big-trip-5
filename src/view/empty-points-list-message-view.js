import { EMPTY_LIST_MESSAGES } from '../const.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';

const createEmptyPointsListMessageTemplate = (filterType) => `<p class="trip-events__msg">${EMPTY_LIST_MESSAGES[filterType]}</p>`;

export default class PointListView extends AbstractStatefulView {
  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createEmptyPointsListMessageTemplate(this.#filterType);
  }
}
