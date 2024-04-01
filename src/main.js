import TripPresenter from './presenter/trip-presenter.js';
import MockService from './service/mock-service.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import PointsModel from './model/points-model.js';

const siteMainElement = document.querySelector('.page-main');

const tripContainer = {
  mainElement: siteMainElement,
  tripMain: document.querySelector('.trip-main'),
  eventListElement: siteMainElement.querySelector('.trip-events'),
  filtersElement: document.querySelector('.trip-controls__filters')
};

const mockService = new MockService();
const destinationsModel = new DestinationsModel(mockService);
const offersModel = new OffersModel(mockService);
const pointsModel = new PointsModel(mockService);

const tripPresenter = new TripPresenter({ tripContainer, destinationsModel, offersModel, pointsModel });
tripPresenter.init();
