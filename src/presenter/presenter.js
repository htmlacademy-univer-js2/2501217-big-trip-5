import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import EditPointView from '../view/edit-point-view.js';
import PointListView from '../view/point-list-view.js';
import PointView from '../view/point-view.js';
import { render, replace } from '../framework/render.js';

export default class Presenter {
  #pointsListComponent = new PointListView();
  #filtersContainer = null;
  #tripEventsContainer = null;
  #pointsModel = null;
  #points = null;

  constructor({filtersContainer, tripEventsContainer, pointsModel}) {
    this.#filtersContainer = filtersContainer;
    this.#tripEventsContainer = tripEventsContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#points = this.#pointsModel.points;

    render(new FilterView(), this.#filtersContainer);
    render(new SortView(), this.#tripEventsContainer);
    render(this.#pointsListComponent, this.#tripEventsContainer);

    this.#points.forEach((point) => this.#renderPoint(point));
  }

  #renderPoint(point) {
    const onEscKeydown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        replaceEditFormToPoint();
        document.removeEventListener('keydown', onEscKeydown);
      }
    };

    const editForm = new EditPointView({point,
      onSubmitClick: () => {
        replaceEditFormToPoint();
        document.removeEventListener('keydown', onEscKeydown);
      },
      onRollButtonClick: () => {
        replaceEditFormToPoint();
        document.removeEventListener('keydown', onEscKeydown);
      }
    });

    const pointItem = new PointView({point,
      onRollButtonClick: () => {
        replacePointToEditForm();
        document.addEventListener('keydown', onEscKeydown);
      }
    });

    function replacePointToEditForm() {
      replace(editForm, pointItem);
    }

    function replaceEditFormToPoint() {
      replace(pointItem, editForm);
    }

    render(pointItem, this.#pointsListComponent.element);
  }
}
