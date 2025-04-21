import PointView from '../view/point-view.js';
import { render, replace, remove } from '../framework/render.js';
import EditFormView from '../view/edit-form-view.js';
import { MODE, ACTIONS, UPDATE_TYPES } from '../const.js';
import { isSameDate } from '../utils/point.js';

export default class PointPresenter {
  #point = null;
  #destinations = null;
  #offers = null;
  #pointItem = null;
  #editFormItem = null;
  #pointsListComponent = null;
  #updateData = null;
  #onModeChange = null;
  #mode = MODE.DEFAULT;

  #onEscKeydown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.#editFormItem.reset(this.#point);
      this.#replaceEditFormToPoint();
      document.removeEventListener('keydown', this.#onEscKeydown);
    }
  };

  constructor({destinations, offers, pointsListComponent, updateData, changeMode}) {
    this.#destinations = destinations;
    this.#offers = offers;
    this.#pointsListComponent = pointsListComponent;
    this.#updateData = updateData;
    this.#onModeChange = changeMode;
  }

  init(point) {
    this.#point = point;
    const prevPointComponent = this.#pointItem;
    const prevEditFormComponent = this.#editFormItem;

    this.#pointItem = new PointView({point: this.#point, destinations: this.#destinations, offers: this.#offers,
      onRollButtonClick:() => {
        this.#replacePointToEditForm();
      },
      onFavoriteClick: () => {
        this.#addToFaivorite();
      }
    });

    this.#editFormItem = new EditFormView({point: this.#point, destinations: this.#destinations, offers: this.#offers,
      onRollButtonClick: () => {
        this.#editFormItem.reset(this.#point);
        this.#replaceEditFormToPoint();
      },
      onSubmitButtonClick: (value) => {
        const isMinor = !isSameDate(value.startDatetime, this.#point.startDatetime) ||
        !isSameDate(value.endDatetime, this.#point.endDatetime);
        this.#updateData(ACTIONS.UPDATE_POINT, isMinor ? UPDATE_TYPES.MINOR : UPDATE_TYPES.PATCH, value);
        this.#replaceEditFormToPoint();
      },
      onDeleteClick: (value) => {
        this.#updateData(ACTIONS.DELETE_POINT, UPDATE_TYPES.MINOR, value);
      },
    });

    if (prevPointComponent === null || prevEditFormComponent === null) {
      render(this.#pointItem, this.#pointsListComponent.element);
      return;
    }

    if (this.#mode === MODE.DEFAULT) {
      replace(this.#pointItem, prevPointComponent);
    }

    if (this.#mode === MODE.EDITING) {
      replace(this.#editFormItem, prevEditFormComponent);
    }

    remove([prevPointComponent, prevEditFormComponent]);
  }

  destroy() {
    remove([this.#pointItem, this.#editFormItem]);
  }

  resetView() {
    if(this.#mode !== MODE.DEFAULT) {
      this.#editFormItem.reset(this.#point);
      this.#replaceEditFormToPoint();
    }
  }

  #replacePointToEditForm() {
    replace(this.#editFormItem, this.#pointItem);
    document.addEventListener('keydown', this.#onEscKeydown);
    this.#onModeChange();
    this.#mode = MODE.EDITING;
  }

  #replaceEditFormToPoint() {
    replace(this.#pointItem, this.#editFormItem);
    document.removeEventListener('keydown', this.#onEscKeydown);
    this.#mode = MODE.DEFAULT;
  }

  #addToFaivorite() {
    this.#updateData(ACTIONS.UPDATE_POINT, UPDATE_TYPES.MINOR, {...this.#point, isFavorite: !this.#point.isFavorite});
  }
}
