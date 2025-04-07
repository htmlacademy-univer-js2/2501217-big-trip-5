import PointsListPresenter from './presenter/points-list-presenter.js';
import PointsModel from './model/points-model.js';

new PointsListPresenter({filtersContainer: document.querySelector('.trip-controls__filters'),
  tripEventsContainer: document.querySelector('.trip-events'),
  pointsModel: new PointsModel()}).init();
