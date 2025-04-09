import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import PointPresenter from './point-presenter.js';
import EmptyPointsListMessageView from '../view/empty-points-list-message-view.js';
import { generateFilters } from '../mock/filter.js';
import { render, remove, RenderPosition } from '../framework/render.js';
import { updateItem } from '../utils/common.js';
import { SORT_TYPES } from '../const.js';
import { sortByDay, sortByTime, sortByPrice } from '../utils/point.js';

export default class PointsListPresenter {
  #pointsListComponent = new PointListView();
  #filtersContainer = null;
  #tripEventsContainer = null;
  #pointsListModel = null;
  #emptyPointListComponent = null;
  #points = null;
  #destinations = null;
  #offers = null;
  #filters = null;
  #sortComponent = null;
  #currentSortType = SORT_TYPES.DAY;
  #pointPresenters = new Map();

  constructor({filtersContainer, tripEventsContainer, pointsListModel}) {
    this.#filtersContainer = filtersContainer;
    this.#tripEventsContainer = tripEventsContainer;
    this.#pointsListModel = pointsListModel;
  }

  init() {
    this.#points = this.#pointsListModel.points;
    this.#offers = this.#pointsListModel.offers;
    this.#destinations = this.#pointsListModel.destinations;
    this.#filters = generateFilters(this.#points);

    this.#renderFilters();
    this.#renderSort();
    this.#renderList();
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      destinations: this.#destinations,
      offers: this.#offers,
      pointsListComponent: this.#pointsListComponent,
      updateData: this.#updatePointsList,
      changeMode: this.#onModeChange
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #onModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #updatePointsList = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #clearPointsList = () => {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    if (this.#emptyPointListComponent) {
      remove(this.#emptyPointListComponent);
    }
  };

  #onSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#renderSort();
    this.#clearPointsList();
    this.#renderList();
  };

  #sortPoints(sortType) {
    switch (sortType) {
      case SORT_TYPES.PRICE:
        this.#points.sort(sortByPrice);
        break;
      case SORT_TYPES.TIME:
        this.#points.sort(sortByTime);
        break;
      default:
        this.#points.sort(sortByDay);
    }

    this.#currentSortType = sortType;
  }

  #renderSort() {
    if (this.#sortComponent !== null) {
      remove(this.#sortComponent);
    }

    this.#sortComponent = new SortView({
      onSortTypeChange: this.#onSortTypeChange,
      currentSortType: this.#currentSortType
    });

    render(this.#sortComponent, this.#tripEventsContainer, RenderPosition.AFTERBEGIN);
  }

  #renderList() {
    render(this.#pointsListComponent, this.#tripEventsContainer);

    if (this.#points.length) {
      this.#sortPoints(this.#currentSortType);
      this.#points.forEach((point) => this.#renderPoint(point));
    } else {
      this.#renderNoPoints();
    }
  }

  #renderNoPoints() {
    this.#emptyPointListComponent = new EmptyPointsListMessageView();
    render(this.#emptyPointListComponent, this.#pointsListComponent);
  }

  #renderFilters() {
    render(new FilterView({filters: this.#filters}), this.#filtersContainer);
  }
}
