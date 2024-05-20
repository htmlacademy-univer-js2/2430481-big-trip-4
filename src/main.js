import TripPresenter from './presenter/trip-presenter.js';
import MockService from './service/mock-service.js';
import PointsModel from './model/points-model.js';

const siteMainElement = document.querySelector('.page-main');

const tripContainer = {
  mainElement: siteMainElement,
  tripMain: document.querySelector('.trip-main'),
  eventListElement: siteMainElement.querySelector('.trip-events'),
  filtersElement: document.querySelector('.trip-controls__filters'),
  newEvtButton: document.querySelector('.trip-main__event-add-btn')
};

const mockService = new MockService();
const pointsModel = new PointsModel(mockService);

const tripPresenter = new TripPresenter({ tripContainer, pointsModel });
tripPresenter.init();
