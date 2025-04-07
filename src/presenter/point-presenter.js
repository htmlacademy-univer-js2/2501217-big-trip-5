import PointView from '../view/point-view.js';
import { render, replace, remove } from '../framework/render.js';
import EditPointView from '../view/edit-point-view.js';
import { MODE } from '../const.js';

export default class PointPresenter {
  #point = null;
  #pointItem = null;
  #editFormItem = null;
  #pointsListComponent = null;
  #onFavouriteBtnClick = null;
  #onModeChange = null;
  #mode = MODE.DEFAULT;

  #onEscKeydown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.#replaceEditFormToPoint();
      document.removeEventListener('keydown', this.#onEscKeydown);
    }
  };

  constructor({pointsListComponent, changeDataOnFavorite, changeMode}) {
    this.#pointsListComponent = pointsListComponent;
    this.#onFavouriteBtnClick = changeDataOnFavorite;
    this.#onModeChange = changeMode;
  }

  init(point) {
    this.#point = point;
    const prevPointComponent = this.#pointItem;
    const prevEditFormComponent = this.#editFormItem;

    this.#pointItem = new PointView({point: this.#point,
      onRollButtonClick:() => {
        this.#replacePointToEditForm();
      },
      onFavoriteClick: () => {
        this.#addToFaivorite();
      }
    });

    this.#editFormItem = new EditPointView({point: this.#point,
      onRollButtonClick: () => {
        this.#replaceEditFormToPoint();
      },
      onSubmitClick: () => {
        this.#replaceEditFormToPoint();
      }
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

    remove(prevPointComponent);
    remove(prevEditFormComponent);
  }

  destroy() {
    remove([this.#pointItem, this.#editFormItem]);
  }

  resetView() {
    if(this.#mode !== MODE.DEFAULT) {
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
    this.#onFavouriteBtnClick({...this.#point, isFavorite: !this.#point.isFavorite});
  }
}
