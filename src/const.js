const EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const CITIES = ['Amsterdam', 'Chamonix', 'Geneva', 'Moscow', 'New York', 'Tokyo', 'Melbourne', 'Shanghai', 'Monaco', 'Dubai', 'Maiami'];

const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];

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
  MAJOR: 'MAJOR',
};

const EMPTY_POINT = {
  eventType: 'flight',
  destination: null,
  startDatetime: null,
  endDatetime: null,
  price: 0,
  offers: [],
  isFavorite: false,
};

const FORM_TYPE = {
  CREATE: 'CREATE',
  EDIT: 'EDIT',
};

export {EVENT_TYPES, CITIES, DESCRIPTIONS, FILTER_TYPES, EMPTY_LIST_MESSAGES, SORT_TYPES, MODE, ACTIONS, UPDATE_TYPES, EMPTY_POINT, FORM_TYPE};
