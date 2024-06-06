import ApiService from '../framework/api-service';
import { connectionFields } from '../consts';

const router = new ApiService(...connectionFields);

async function getDestinations () {
  return await router
    ._load({url: 'big-trip/destinations'})
    .then(ApiService.parseResponse)
    .then((data) => data);
}

async function getOffers () {
  return await router
    ._load({url: 'big-trip/offers'})
    .then(ApiService.parseResponse)
    .then((data) => data);
}

async function getRoutes(adaptFunc) {
  return router._load({url: 'big-trip/points'})
    .then(ApiService.parseResponse)
    .then((data) => data.map(adaptFunc));
}

async function removeRoute (ID) {
  return await router
    ._load({url: `big-trip/points/${ID}`, method: 'DELETE'});
}

export { getOffers, getDestinations, removeRoute, getRoutes };
