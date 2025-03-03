import Presenter from './presenter/presenter.js';
import PointsModel from './model/points-model.js';

const filtersContainerElement = document.querySelector('.trip-controls__filters');
const tripEventsContainerElement = document.querySelector('.trip-events');
new Presenter({filtersContainer: filtersContainerElement, tripEventsContainer: tripEventsContainerElement,
  pointsModel: new PointsModel()}).init();
