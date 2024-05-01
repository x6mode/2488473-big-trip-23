import getRandomArrayElement, { getRandomNumber } from '../utils.js';

const mockRoutes = [
  {
    id: 'f4b62099-263f-4c3d-a702-94eec4a2808c',
    name: 'Germany',
    basePrice: 500,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: 'bfa6cb75-a1fe-4b77-a83c-0e528e910e04',
    isFavorite: false,
    offers: [],
    type: 'taxi',
  },
  {
    id: 'f4b62099-297f-4c3d-a702-94eec4a2808c',
    basePrice: 340,
    name: 'Austrlia',
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: 'bfa5cb75-a1fe-4b77-a93c-0e528e910e04',
    isFavorite: false,
    offers: [{ title: 'Add luggage', price: 120 }],
    type: 'drive'
  },
  {
    id: 'f4b62099-293f-4c3d-a702-94eec8a2808c',
    basePrice: 900,
    name: 'Brazilia',
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: 'bfa5cb75-a1fe-4b77-a83c-0e828e910e04',
    isFavorite: false,
    offers: [{ title: 'Add luggage', price: 120 }, { title: 'Add luggage', price: 120 }],
    type: 'taxi'
  },
  {
    id: 'f4b62099-293f-4c3d-a702-94eec3a2808c',
    basePrice: 120,
    name: 'Gargantuya',
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: 'bfa5cb75-a1fe-4b77-a83c-0e528e010e04',
    isFavorite: true,
    offers: [{ title: 'Add luggage', price: 120 }, { title: 'Add luggage', price: 120 }, { title: 'Add luggage', price: 120 }],
    type: 'flight'
  }
];

const mockRoutesEdit = {
  type: 'check-in',
  destination: 'London',
  dateFrom: '2019-07-10T22:55:56.845Z',
  dateTo: '2019-07-11T11:22:13.375Z',
  price: 259,
  offers: ['seats', 'comfort'],
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'.split('. ').slice(getRandomNumber(0, 10), 11).join('. '),
};

const getRandomRoute = () => getRandomArrayElement(mockRoutes);

export { getRandomRoute as default, mockRoutesEdit };
