import TripInfoView from './view/trip-info.js';
import FilterView from './view/filter-view.js';
import TripPresenter from './presenter/trip-presenter.js';
import { RenderPosition, render } from './render.js';

const infoContainer = document.querySelector('.trip-main');
const filtersContainter = document.querySelector('.trip-controls__filters');
const pageMainElement = document.querySelector('.page-main');
const tripContainer = pageMainElement.querySelector('.trip-events');
const tripPresenter = new TripPresenter(tripContainer);

render(new TripInfoView(), infoContainer, RenderPosition.AFTERBEGIN);
render(new FilterView(), filtersContainter);

tripPresenter.init();
