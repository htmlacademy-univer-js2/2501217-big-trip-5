import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import AddNewPointView from '../view/add-new-point-view.js';
import EditPointView from '../view/edit-point-view.js';
import PointListView from '../view/point-list-view.js';
import PointView from '../view/point-view.js';
import {render} from '../render.js';

export default class Presenter {
  pointListComponent = new PointListView();

  constructor(filtersContainer, tripEventsContainer) {
    this.filtersContainer = filtersContainer;
    this.tripEventsContainer = tripEventsContainer;
  }

  init() {
    render(new FilterView(), this.filtersContainer);
    render(new SortView(), this.tripEventsContainer);
    render(this.pointListComponent, this.tripEventsContainer);
    render(new EditPointView(), this.pointListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new PointView(), this.pointListComponent.getElement());
    }

    render(new AddNewPointView(), this.pointListComponent.getElement());
  }
}
