import Presenter from './presenter/presenter.js';

const filtersContainerElement = document.querySelector('.trip-controls__filters');
const tripEventsContainerElement = document.querySelector('.trip-events');
new Presenter(filtersContainerElement, tripEventsContainerElement).init();
