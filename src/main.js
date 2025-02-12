import Presenter from './presenter/presenter.js';

const filtersContainerElement = document.querySelector('.trip-controls__filters');
const tripEventsContainerElement = document.querySelector('.trip-events');
const presenter = new Presenter(filtersContainerElement, tripEventsContainerElement);

presenter.init();
