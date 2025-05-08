import Observable from '../framework/observable.js';
import { updateItem } from '../utils/common.js';
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
      const response = await this.#pointsApiService.updatePoint(point).then(this.#adaptToClient);
      this.#points = updateItem(this.#points, response);
    } catch (err) {
      throw new Error('Can\'t update point');
    }
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

  async init() {
    try {
      const points = await this.#pointsApiService.points;
      this.#points = points.map(this.#adaptToClient);
      this.#destinations = await this.#pointsApiService.destinations;
      this.#offers = await this.#pointsApiService.offers;
    } catch(err) {
      this.#points = [];
      this.#offers = [];
      this.#destinations = [];
    }
    this._notify(UPDATE_TYPES.INIT, null);
  }

  #adaptToClient(point) {
    const adaptedPoint = {...point,
      dateFrom: point['date_from'] !== null ? new Date(point['date_from']) : new Date(point['date_from']),
      dateTo: point['date_to'] !== null ? new Date(point['date_to']) : new Date(point['date_to']),
      basePrice: point['base_price'],
      isFavorite: point['is_favorite'],
    };

    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['base_price'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  }
}
