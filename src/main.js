import PointsListPresenter from './presenter/points-list-presenter.js';
import PointsListModel from './model/points-list-model.js';

new PointsListPresenter({filtersContainer: document.querySelector('.trip-controls__filters'),
  tripEventsContainer: document.querySelector('.trip-events'),
  pointsListModel: new PointsListModel()}).init();
