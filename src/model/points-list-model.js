import { POINTS } from '../mock/point.js';
import { OFFERS } from '../mock/offer.js';
import { DESTINATIONS } from '../mock/destination.js';
import Observable from '../framework/observable.js';
import { updateItem } from '../utils/common.js';

export default class PointsListModel extends Observable {
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

  getPointById(id) {
    return this.#points.find((point) => point.id === id);
  }

  updatePoint(updateType, point) {
    this.#points = updateItem(this.#points, point);
    this._notify(updateType, point);
  }

  addPoint(updatePoint, point) {
    this.#points.push(point);
    this._notify(updatePoint, point);
  }

  deletePoint(updateType, point) {
    this.#points = this.#points.filter((pointItem) => pointItem.id !== point.id);
    this._notify(updateType);
  }
}
