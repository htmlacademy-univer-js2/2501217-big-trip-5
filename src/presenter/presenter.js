import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import AddNewPointView from '../view/add-new-point-view.js';
import EditPointView from '../view/edit-point-view.js';
import PointListView from '../view/point-list-view.js';
import PointView from '../view/point-view.js';
import {render} from '../render.js';

export default class Presenter {
  pointListComponent = new PointListView();

  constructor({filtersContainer, tripEventsContainer, pointsModel}) {
    this.filtersContainer = filtersContainer;
    this.tripEventsContainer = tripEventsContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.points = [...this.pointsModel.getPoints()];

    render(new FilterView(), this.filtersContainer);
    render(new SortView(), this.tripEventsContainer);
    render(this.pointListComponent, this.tripEventsContainer);
    render(new EditPointView({point: this.points[0]}), this.pointListComponent.getElement());

    for (let i = 1; i < this.points.length; i++) {
      render(new PointView({point: this.points[i]}), this.pointListComponent.getElement());
    }

    render(new AddNewPointView(), this.pointListComponent.getElement());
  }
}
