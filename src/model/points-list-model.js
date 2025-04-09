import { POINTS } from '../mock/point.js';
import { OFFERS } from '../mock/offer.js';
import { DESTINATIONS } from '../mock/destination.js';

export default class PointsListModel {
  #points = [...POINTS];
  #offers = [...OFFERS];
  #destinations = [...DESTINATIONS];

  get points() {
    return this.#points;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }
}
