import {getRandomArrayElement, getRandomInteger} from '../utils/common.js';
import {getTwoRandomDates} from '../utils/point.js';
import { EVENT_TYPES } from '../const.js';
import { getRandomDestination } from './destination.js';
import { getRandomOffersIds } from './offer.js';

const MIN_PRICE = 1000;
const MAX_PRICE = 3000;
const POINTS_COUNT = 5;

const getRandomPoint = () => {
  const dates = getTwoRandomDates();
  const eventType = getRandomArrayElement(EVENT_TYPES);

  return {
    id: crypto.randomUUID(),
    eventType,
    destination: getRandomDestination(),
    startDatetime: dates[0],
    endDatetime: dates[1],
    price: getRandomInteger(MIN_PRICE, MAX_PRICE),
    offers: getRandomOffersIds(eventType),
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};

const POINTS = Array.from({length: POINTS_COUNT}, getRandomPoint);

export {POINTS};
