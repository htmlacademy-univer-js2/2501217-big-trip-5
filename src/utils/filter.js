import { FilterType } from '../consts.js';
import { isFutureEvent, isPastEvent, isPresentEvent } from './point.js';

export const pointsFilters = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isFutureEvent(point.dateFrom)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isPresentEvent(point.dateFrom, point.dateTo)),
  [FilterType.PAST]: (points) => points.filter((point) => isPastEvent(point.dateTo))
};
