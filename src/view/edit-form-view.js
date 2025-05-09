import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {getFullDate, getOffersByType, getDestinationById} from '../utils/point.js';
import { EVENT_TYPES, EMPTY_POINT, FORM_TYPE } from '../const.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const FLATPICKR_CONFIG = {
  dateFormat: 'd/m/y H:i',
  enableTime: true,
  locale: {
    firstDayOfWeek: 1,
  },
  // eslint-disable-next-line camelcase
  time_24hr: true,
};

function createOfferTemplate(offer, pointOffers, isDisabled) {
  const {id, title, price} = offer;
  const isOptionChecked = pointOffers.includes(id);

  return `<div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}-1" type="checkbox" name="event-offer-${id}" value="${id}" ${isOptionChecked ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}>
            <label class="event__offer-label" for="event-offer-${id}-1">
              <span class="event__offer-title">${title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${price}</span>
            </label>
          </div>`;
}

const createEditFormTemplate = (state, destinations, allOffers, formType) => {
  const {id, type, destination, dateFrom, dateTo, basePrice, offers, isDisabled, isSaving, isDeleting} = state;
  const availableOffers = getOffersByType(type, allOffers);
  const pointDestination = getDestinationById(destination, destinations) || '';
  const isDestinationValid = pointDestination !== undefined && pointDestination.name !== undefined && pointDestination.pictures !== undefined && pointDestination.description !== undefined;
  const DeleteBtnText = isDeleting ? 'Deleting...' : 'Delete';

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? 'disabled' : ''}>

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${EVENT_TYPES.map((eventType) => `<div class="event__type-item">
                  <input id="event-type-${eventType.toLowerCase()}-1" class="event__${eventType.toLowerCase()}-input  visually-hidden" type="radio" name="event-type" value="${eventType.toLowerCase()}" ${type === eventType ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}>
                  <label class="event__type-label  event__type-label--${eventType.toLowerCase()}" for="event-type-${eventType.toLowerCase()}-1">${eventType}</label>
                </div>`).join('')}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-${id}">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${isDestinationValid ? pointDestination.name : ''}" list="destination-list-${id}" required ${isDisabled ? 'disabled' : ''}>
            <datalist id="destination-list-${id}">
              ${destinations.map((dest) => `<option value="${dest.id}">${dest.name}</option>`).join('')};
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFrom ? getFullDate(dateFrom) : ''}" ${isDisabled ? 'disabled' : ''}>
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateTo ? getFullDate(dateTo) : ''}" ${isDisabled ? 'disabled' : ''}>
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}" ${isDisabled ? 'disabled' : ''}>
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
          <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>
            ${formType === FORM_TYPE.EDIT ? DeleteBtnText : 'Cancel'}
          </button>
          ${formType === FORM_TYPE.EDIT ? `<button class="event__rollup-btn" type="button" ${isDisabled ? 'disabled' : ''}>
            <span class="visually-hidden">Open event</span>
          </button>` : ''}
        </header>
        <section class="event__details">
          ${(availableOffers.length !== 0) ? `<section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            <div class="event__available-offers">
              ${availableOffers.map((option) => createOfferTemplate(option, offers, isDisabled)).join('')}
            </div>
          </section>` : ''}

          ${isDestinationValid ? `<section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${pointDestination.description}</p>
            <div class="event__photos-container">
              <div class="event__photos-tape">
                ${pointDestination.pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join('')}
              </div>
            </div>
          </section>` : ''}
        </section>
      </form>
    </li>`
  );
};

export default class EditFormView extends AbstractStatefulView {
  #destinations = null;
  #offers = null;
  #onResetClick = null;
  #onRollButtonClick = null;
  #onSubmitButtonClick = null;
  #datepickerStart = null;
  #datepickerEnd = null;
  #onDeleteClick = null;
  #type;

  constructor({point = EMPTY_POINT, destinations, offers, onRollButtonClick, onSubmitButtonClick, onResetClick, onDeleteClick, type = FORM_TYPE.EDIT}) {
    super();
    this._setState(this.#parsePointToState(point));
    this.#destinations = destinations;
    this.#offers = offers;
    this.#onRollButtonClick = onRollButtonClick;
    this.#onSubmitButtonClick = onSubmitButtonClick;
    this.#onResetClick = onResetClick;
    this.#onDeleteClick = onDeleteClick;
    this.#type = type;

    this._restoreHandlers();
  }

  get template() {
    return createEditFormTemplate(this._state, this.#destinations, this.#offers, this.#type);
  }

  reset = (point) => this.updateElement(this.#parsePointToState(point));

  #onSubmitButtonElementClick = (event) => {
    event.preventDefault();
    this.#onSubmitButtonClick(this.#parseStateToPoint());
  };

  #changePointType = (event) => {
    this.updateElement({
      type: event.target.value,
      offers: [],
    });
  };

  #onRollButtonElementClick = (event) => {
    event.preventDefault();
    this.#onRollButtonClick();
  };

  #onPriceChange = (event) => {
    event.preventDefault();
    this._setState({
      basePrice: Number(event.target.value),
    });
  };

  #onDestinationChange = (event) => {
    const selectedDestination = getDestinationById(event.target.value, this.#destinations);
    const selectedDestinationCity = selectedDestination ? selectedDestination.id : null;

    this.updateElement({
      destination: selectedDestinationCity,
    });
  };

  #onOffersChange = (event) => {
    event.preventDefault();
    const offers = this._state.offers;
    const checkedOffers = offers.includes(event.target.value) ? offers.filter((item) =>
      item !== event.target.value) : [...offers, event.target.value];

    this._setState({
      offers: checkedOffers,
    });
  };

  #onDateStartCloseButtonClick = ([date]) => {
    this._setState({
      dateFrom: date,
    });
    this.#datepickerEnd.set('minDate', this._state.dateFrom);
  };

  #onDateEndCloseButtonClick = ([date]) => {
    this._setState({
      dateTo: date,
    });
    this.#datepickerStart.set('maxDate', this._state.dateTo);
  };

  #setDatepickers = () => {
    const [dateStartElement, dateEndElement] = this.element.querySelectorAll('.event__input--time');

    this.#datepickerStart = flatpickr(dateStartElement, {
      ...FLATPICKR_CONFIG,
      defaultDate: this._state.dateFrom,
      onClose: this.#onDateStartCloseButtonClick,
      maxDate: this._state.dateTo,
    });

    this.#datepickerEnd = flatpickr(dateEndElement, {
      ...FLATPICKR_CONFIG,
      defaultDate: this._state.dateTo,
      onClose: this.#onDateEndCloseButtonClick,
      minDate: this._state.dateFrom,
    });
  };

  removeElement = () => {
    super.removeElement();
    this.#removeAnyElement(this.#datepickerStart);
    this.#removeAnyElement(this.#datepickerEnd);
  };

  #removeAnyElement = (element) => {
    if(element) {
      element.destroy();
      element = null;
    }
  };

  #formValidation = (event) => {
    const formNode = event.target?.form || event.target;
    if (!formNode) {
      return;
    }
    const destValue = this.element.querySelector('.event__input--destination')?.value || '';
    const priceValue = this.element.querySelector('.event__input--price')?.value || '';
    const dateFrom = this.element.querySelector('[name="event-start-time"]')?.value || '';
    const dateTo = this.element.querySelector('[name="event-end-time"]')?.value || '';

    const isDurationValid = dateFrom && dateTo;
    const isDestinationValid = this.#destinations.some((dest) => dest.name === destValue);
    const isValid = priceValue && Number(priceValue) > 0 && isDestinationValid && isDurationValid;

    const saveButton = formNode.querySelector('.event__save-btn');
    if (saveButton) {
      saveButton.disabled = !isValid;
    }
  };

  _restoreHandlers = () => {
    if (this.#type === FORM_TYPE.EDIT) {
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onRollButtonElementClick);
      this.element.querySelector('.event__reset-btn').addEventListener('click', (event) => {
        event.preventDefault();
        this.#onDeleteClick(this._state);
      });
    }

    if (this.#type === FORM_TYPE.CREATE) {
      this.element.querySelector('.event__reset-btn').addEventListener('click', this.#onResetClick);
    }

    this.element.querySelector('.event--edit').addEventListener('submit', this.#onSubmitButtonElementClick);
    this.element.querySelector('.event--edit').addEventListener('input', this.#formValidation);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#changePointType);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#onPriceChange);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#onDestinationChange);
    this.element.querySelectorAll('.event__offer-checkbox').forEach((element) =>
      element.addEventListener('change', this.#onOffersChange));
    this.#setDatepickers();

    let form;
    if (this.element) {
      form = this.element.querySelector('.event--edit');
    }

    if (form) {
      this.#formValidation({ target: form });
    }
  };

  #parsePointToState = (point) => ({
    ...point,
    isDisabled: false,
    isSaving: false,
    isDeleting: false,
  });

  #parseStateToPoint = () => {
    const point = {...this._state};
    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;
    return point;
  };
}
