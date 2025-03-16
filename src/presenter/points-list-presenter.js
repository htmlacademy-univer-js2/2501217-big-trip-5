import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import PointPresenter from './point-presenter.js';
import EmptyPointsListMessageView from '../view/empty-points-list-message-view.js';
import { generateFilters } from '../mock/filter.js';
import { render } from '../framework/render.js';
import { updatePoint } from '../utils/point.js';

export default class PointsListPresenter {
  #pointsListComponent = new PointListView();
  #filtersContainer = null;
  #tripEventsContainer = null;
  #pointsModel = null;
  #points = null;
  #filters = null;
  #pointPresenters = new Map();

  #onModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #onFavoriteBtnClick = (updatedPoint) => {
    this.#points = updatePoint(this.#points, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  constructor({filtersContainer, tripEventsContainer, pointsModel}) {
    this.#filtersContainer = filtersContainer;
    this.#tripEventsContainer = tripEventsContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#points = this.#pointsModel.points;
    this.#filters = generateFilters(this.#points);

    render(new FilterView({filters: this.#filters}), this.#filtersContainer);
    render(new SortView(), this.#tripEventsContainer);
    render(this.#pointsListComponent, this.#tripEventsContainer);

    if (this.#points.length > 0) {
      this.#points.forEach((point) => this.#renderPoint(point));
    } else {
      render(new EmptyPointsListMessageView(), this.#pointsListComponent.element);
    }
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointsListComponent: this.#pointsListComponent,
      changeDataOnFavorite: this.#onFavoriteBtnClick,
      changeMode: this.#onModeChange
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }
}
