import Observable from '../framework/observable.js';
import { updateItem } from '../utils/point.js';
import { adaptToClient } from '../utils/adapter.js';
import { UPDATE_TYPES } from '../const.js';

export default class PointsListModel extends Observable {
  #points = [];
  #offers = [];
  #destinations = [];
  #pointsApiService = null;

  constructor({pointsApiService}) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  get points() {
    return this.#points;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }

  async updatePoint(updateType, point) {
    try {
      const response = await this.#pointsApiService.updatePoint(point);
      const updatedPoint = adaptToClient(response);
      this.#points = updateItem(this.#points, updatedPoint);
      this._notify(updateType, updatedPoint);
    } catch (err) {
      throw new Error('Can\'t update point');
    }
  }

  async addPoint(updateType, point) {
    try {
      const response = await this.#pointsApiService.addPoint(point);
      const newPoint = adaptToClient(response);
      this.#points = [newPoint, ...this.#points];
      this._notify(updateType, newPoint);
    } catch(err) {
      throw new Error('Can\'t add point');
    }
  }

  async deletePoint(updateType, point) {
    try {
      await this.#pointsApiService.deletePoint(point);
      this.#points = this.#points.filter((pointItem) => pointItem.id !== point.id);
      this._notify(updateType);
    } catch(err) {
      throw new Error('Can\'t delete point');
    }
  }

  async init() {
    try {
      const points = await this.#pointsApiService.points;
      this.#points = points.map(adaptToClient);
      this.#destinations = await this.#pointsApiService.destinations;
      this.#offers = await this.#pointsApiService.offers;
    } catch(err) {
      this.#points = [];
      this.#offers = [];
      this.#destinations = [];
    }
    this._notify(UPDATE_TYPES.INIT, null);
  }
}
