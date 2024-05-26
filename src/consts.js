const timeFormat = 'HH:mm';
const timeFormatView = {
  minutly: 'mm[M]',
  hourly: 'HH[H] mm[M]',
  dayly: 'DD[D] HH[H] mm[M]'
};
const timeFormatEdit = 'DD/MM/YY HH:mm';

const eventTypes = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];
const offerTypes = [
  { luggage: 'Add luggage', price: 50 },
  { comfort: 'Switch to comfort', price: 80 },
  { meal: 'Add meal', price: 15 },
  { seats: 'Choose seats', price: 5 },
  { train: 'Travel by train', price: 40 },
];

const connectionFields = ['https://23.objects.htmlacademy.pro', 'Basic aerb6Hfwj43C'];

export { timeFormat as default, eventTypes, offerTypes, timeFormatEdit, connectionFields, timeFormatView };
