import { FILTER_TYPES } from '../const.js';
import { isFutureEvent, isPastEvent, isPresentEvent } from './point.js';

const pointsFilters = {
  [FILTER_TYPES.EVERYTHING]: (points) => points,
  [FILTER_TYPES.FUTURE]: (points) => points.filter((point) => isFutureEvent(point.dateFrom)),
  [FILTER_TYPES.PRESENT]: (points) => points.filter((point) => isPresentEvent(point.dateFrom, point.dateTo)),
  [FILTER_TYPES.PAST]: (points) => points.filter((point) => isPastEvent(point.dateTo))
};

export { pointsFilters };
