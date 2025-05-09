import { CITIES_LENGTH_BORDER } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';
import { getPointsDataRange, getTripPrice, getTripRoute } from '../utils/point.js';

function createTripInfoTemplate(dateRange, cities, totalPrice) {
  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${cities.length > CITIES_LENGTH_BORDER ? `${cities[0]} &mdash; .... &mdash; ${cities.at(-1)}` : cities.join(' &mdash; ')}</h1>

        <p class="trip-info__dates">${dateRange.startDate}&nbsp;&mdash;&nbsp;${dateRange.endDate}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
      </p>
    </section>`
  );
}

export default class TripInfoView extends AbstractView {
  #points = null;
  #destinations = null;
  #offers = null;

  constructor(points, destinations, offers) {
    super();
    this.#points = points;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  get template() {
    return createTripInfoTemplate(
      getPointsDataRange(this.#points),
      getTripRoute(this.#points, this.#destinations),
      getTripPrice(this.#points, this.#offers)
    );
  }
}
