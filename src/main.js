import PointsListPresenter from './presenter/points-list-presenter.js';
import PointsListModel from './model/points-list-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model.js';
import NewPointButtonPresenter from './presenter/new-point-button-presenter.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import PointsApiService from './points-api-service.js';
import { AUTHORIZATION, END_POINT } from './const.js';

const pointsListModel = new PointsListModel({pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)});

const filterModel = new FilterModel();

const tripInfoPresenter = new TripInfoPresenter({
  container: document.querySelector('.trip-main'),
  pointsListModel: pointsListModel
});

const newPointButtonPresenter = new NewPointButtonPresenter({
  container: document.querySelector('.trip-main')
});

const pointsListPresenter = new PointsListPresenter({
  tripEventsContainer: document.querySelector('.trip-events'),
  filterModel,
  pointsListModel,
  newPointButtonPresenter
});

new FilterPresenter({
  filterContainer: document.querySelector('.trip-controls__filters'),
  filterModel,
  pointsListModel
}).init();

newPointButtonPresenter.init({ onNewPointButtonClick: pointsListPresenter.onNewPointButtonClick });
pointsListPresenter.init();
pointsListModel.init();
tripInfoPresenter.init();
