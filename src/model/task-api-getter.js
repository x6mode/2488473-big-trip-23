import ApiService from '../framework/api-service';
import { connectionFields } from '../consts';

const router = new ApiService(...connectionFields);

async function getDestantionNameByID () {
  return await router
    ._load({url: 'big-trip/destinations'})
    .then(ApiService.parseResponse)
    .then((data) => data);
}

async function getAllRoutesOffers () {
  return await router
    ._load({url: 'big-trip/offers'})
    .then(ApiService.parseResponse)
    .then((data) => data);
}

async function removeRoute (ID) {
  return await router
    ._load({url: `big-trip/points/${ID}`, method: 'DELETE'});
}

export { getDestantionNameByID as default, getAllRoutesOffers, removeRoute };
