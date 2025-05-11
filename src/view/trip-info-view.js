import { CITIES_LENGTH_BORDER } from '../consts.js';
import AbstractView from '../framework/view/abstract-view.js';
import { getPointsDataRange, getTripPrice, getTripRoute } from '../utils/point.js';

function createTemplate(dateRange, cities, totalPrice) {
  const route = cities.length > CITIES_LENGTH_BORDER ? `${cities[0]} &mdash; ... &mdash; ${cities.at(-1)}` : cities.join(' &mdash; ');

  return `
    <section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${route}</h1>

        <p class="trip-info__dates">${dateRange.startDate}&nbsp;&mdash;&nbsp;${dateRange.endDate}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
      </p>
    </section>
  `;
}

export default class TripInfoView extends AbstractView {
  #points;
  #destinations;
  #offers;

  constructor(points, destinations, offers) {
    super();
    this.#points = points;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  get template() {
    const dateRange = getPointsDataRange(this.#points);
    const route = getTripRoute(this.#points, this.#destinations);
    const price = getTripPrice(this.#points, this.#offers);

    return createTemplate(dateRange, route, price);
  }
}
