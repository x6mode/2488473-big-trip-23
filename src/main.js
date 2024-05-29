import { connectionFields } from './consts.js';
import Model from './model/first-model.js';
import getDestantionNameByID, { getAllRoutesOffers } from './model/task-api-getter.js';
import Presenter from './presenter/first-present.js';


const Modeler = new Model(...connectionFields);

document.querySelector('.trip-main__event-add-btn').disabled = true;

document
  .querySelector('.trip-events')
  .innerHTML += '<p class="trip-events__msg loading-animation">Loading...</p>';

Modeler
  .allRoutes()
  .then((routes) => {
    getAllRoutesOffers()
      .then((offers) => {
        getDestantionNameByID()
          .then((allDestanation) => {
            document.querySelector('.trip-events__msg').remove();
            const Present = new Presenter({routes, offers});

            Present.init(allDestanation);
          });
      });
  });
