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
      onSubmitButtonClick: async (value) => {
        const isMinor = !isSameDate(value.dateFrom, this.#point.dateFrom) ||
        !isSameDate(value.dateTo, this.#point.dateTo);
        await this.#updateData(ACTIONS.UPDATE_POINT, isMinor ? UPDATE_TYPES.MINOR : UPDATE_TYPES.PATCH, value);
      },
      onDeleteClick: async (value) => {
        await this.#updateData(ACTIONS.DELETE_POINT, UPDATE_TYPES.MINOR, value);
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
      replace(this.#pointItem, prevEditFormComponent);
      this.#mode = MODE.DEFAULT;
    }

    remove([prevPointComponent, prevEditFormComponent]);
  }

  destroy() {
    document.removeEventListener('keydown', this.#onEscKeydown);
    remove([this.#pointItem, this.#editFormItem]);
  }

  resetView() {
    if(this.#mode !== MODE.DEFAULT) {
      this.#editFormItem.reset(this.#point);
      this.#replaceEditFormToPoint();
    }
  }

  setSaving() {
    if (this.#mode === MODE.EDITING) {
      this.#editFormItem.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  }

  setDeleting() {
    if (this.#mode === MODE.EDITING) {
      this.#editFormItem.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  }

  setAborting() {
    const resetFormState = () => {
      this.#editFormItem.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#editFormItem.shake(resetFormState);
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
