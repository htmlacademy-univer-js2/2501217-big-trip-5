import PointsListPresenter from './presenter/points-list-presenter.js';
import PointsModel from './model/points-model.js';

const filtersContainerElement = document.querySelector('.trip-controls__filters');
const tripEventsContainerElement = document.querySelector('.trip-events');
new PointsListPresenter({filtersContainer: filtersContainerElement, tripEventsContainer: tripEventsContainerElement,
  pointsModel: new PointsModel()}).init();
