import {getRandomArrayElement, getRandomInteger} from '../utils/common.js';
import {CITIES, DESCRIPTIONS} from '../const.js';

const MIN_DESCRIPTIONS_COUNT = 1;
const MAX_DESCRIPTIONS_COUNT = 5;
const MIN_PICTURES_COUNT = 1;
const MAX_PICTURES_COUNT = 5;

const getDestinationByCity = (city) => ({
  id: crypto.randomUUID(),
  description: Array.from({length: getRandomInteger(MIN_DESCRIPTIONS_COUNT, MAX_DESCRIPTIONS_COUNT)}, () => getRandomArrayElement(DESCRIPTIONS)).join(' '),
  city,
  pictures: Array.from({length: getRandomInteger(MIN_PICTURES_COUNT, MAX_PICTURES_COUNT)}, () => ({
    src: `https://loremflickr.com/248/152?random=${getRandomInteger(1, 1000)}`,
    alt: `Picture of the ${city}`,
  })),
});

const DESTINATIONS = CITIES.map(getDestinationByCity);

const getRandomDestination = () => getRandomArrayElement(DESTINATIONS).city;

export {getRandomDestination, DESTINATIONS};
