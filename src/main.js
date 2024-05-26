import TripPresenter from './presenter/trip-presenter.js';
import PointsApiService from './service/points-api-service.js';
import PointModel from './model/points-model.js';

const siteMainElement = document.querySelector('.page-main');

const tripContainer = {
  mainElement: siteMainElement,
  tripMain: document.querySelector('.trip-main'),
  eventListElement: siteMainElement.querySelector('.trip-events'),
  filtersElement: document.querySelector('.trip-controls__filters'),
  newEvtButton: document.querySelector('.trip-main__event-add-btn')
};

const pointsApiService = new PointsApiService('https://21.objects.htmlacademy.pro/big-trip', 'Basic Hs12pS44wSl2sa2J='); //?
const pointModel = new PointModel(pointsApiService);

const tripPresenter = new TripPresenter({ tripContainer, pointsModel: pointModel });
tripPresenter.init();
pointModel.init();//?
