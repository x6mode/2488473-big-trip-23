import ApiService from '../framework/api-service';
import { connectionFields } from '../consts';

const router = new ApiService(...connectionFields);

async function getDestantionNameByID (ID = '') {
  return await router
    ._load({url: 'big-trip/destinations'})
    .then(ApiService.parseResponse)
    .then((data) => {
      if (ID !== '') {
        for(let i = 0; i < data.length; i++) {
          if (data[i].id === ID) {
            return data[i].name;
          }
        }
      }
      return data;
    });
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
