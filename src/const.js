const EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const FILTER_TYPES = {
  EVERYTHING: 'EVERYTHING',
  FUTURE: 'FUTURE',
  PRESENT: 'PRESENT',
  PAST: 'PAST'
};

const EMPTY_LIST_MESSAGES = {
  [FILTER_TYPES.EVERYTHING]: 'Click New Event to create your first point',
  [FILTER_TYPES.PAST]: 'There are no past events now',
  [FILTER_TYPES.PRESENT]: 'There are no present events now',
  [FILTER_TYPES.FUTURE]: 'There are no future events now'
};

const SORT_TYPES = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
};

const MODE = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const ACTIONS = {
  UPDATE_POINT: 'UPDATE_POINT',
  DELETE_POINT: 'DELETE_POINT',
  ADD_POINT: 'ADD_POINT',
};

const UPDATE_TYPES = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  INIT: 'INIT',
};

const EMPTY_POINT = {
  type: 'flight',
  destination: null,
  dateFrom: null,
  dateTo: null,
  basePrice: 0,
  offers: [],
  isFavorite: false,
};

const FORM_TYPE = {
  CREATE: 'CREATE',
  EDIT: 'EDIT',
};

const METHOD = {
  GET: 'GET',
  PUT: 'PUT',
};

const AUTHORIZATION = 'Basic v2a14a3i8a7t0rr';

const END_POINT = 'https://21.objects.htmlacademy.pro/big-trip';

export {
  EVENT_TYPES,
  FILTER_TYPES,
  EMPTY_LIST_MESSAGES,
  SORT_TYPES,
  MODE,
  ACTIONS,
  UPDATE_TYPES,
  EMPTY_POINT,
  FORM_TYPE,
  METHOD,
  AUTHORIZATION,
  END_POINT
};
