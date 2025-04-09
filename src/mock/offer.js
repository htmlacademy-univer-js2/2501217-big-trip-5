import { getRandomArrayElements, getRandomInteger } from '../utils/common.js';
import { getOffersByType } from '../utils/point.js';

const OFFERS = [
  {
    type: 'taxi',
    offers: [
      {
        id: 'add-luggage',
        title: 'Add luggage',
        price: 2,
      },
      {
        id: 'switch-to-comfort',
        title: 'Switch to comfort',
        price: 5,
      },
      {
        id: 'baby-seat',
        title: 'Baby seat',
        price: 2,
      },
    ],
  },
  {
    type: 'ship',
    offers: [
      {
        id: 'add-breakfast',
        title: 'Add breakfast',
        price: 5,
      },
      {
        id: 'add-luggage',
        title: 'Add luggage',
        price: 30,
      },
      {
        id: 'rent-a-car',
        title: 'Rent a car',
        price: 200,
      },
    ],
  },
  {
    type: 'bus',
    offers: [
      {
        id: 'add-breakfast',
        title: 'Add breakfast',
        price: 5,
      },
      {
        id: 'add-luggage',
        title: 'Add luggage',
        price: 40,
      },
      {
        id: 'choose-single-seat',
        title: 'Choose single seat',
        price: 80,
      },
    ],
  },
  {
    type: 'flight',
    offers: [
      {
        id: 'add-breakfast',
        title: 'Add breakfast',
        price: 15,
      },
      {
        id: 'add-luggage',
        title: 'Add luggage',
        price: 50,
      },
      {
        id: 'upgrade-to-business',
        title: 'Upgrade to a business class',
        price: 200,
      },
      {
        id: 'rent-a-car',
        title: 'Rent a car',
        price: 200,
      },
      {
        id: 'order-uber',
        title: 'Order Uber',
        price: 20,
      },
    ],
  },
  {
    type: 'drive',
    offers: [],
  },
  {
    type: 'train',
    offers: [
      {
        id: 'add-breakfast',
        title: 'Add breakfast',
        price: 10,
      },
      {
        id: 'add-luggage',
        title: 'Add luggage',
        price: 20,
      },
      {
        id: 'choose-single-seat',
        title: 'Choose single seat',
        price: 60,
      },
    ],
  },
  {
    type: 'check-in',
    offers: [
      {
        id: 'add-breakfast',
        title: 'Add breakfast',
        price: 70,
      },
      {
        id: 'order-transfer',
        title: 'Order a transfer',
        price: 40,
      },
      {
        id: 'good-view',
        title: 'Good view',
        price: 100,
      },
    ],
  },
  {
    type: 'sightseeing',
    offers: [
      {
        id: 'take-guide',
        title: 'Take a guide',
        price: 10,
      },
      {
        id: 'tahe-translater',
        title: 'Take a translater',
        price: 5,
      },
      {
        id: 'take-city-tour',
        title: 'Take a City tour',
        price: 150,
      },
    ],
  },
  {
    type: 'restaurant',
    offers: [],
  },
];

const OFFERS_MIN_COUNT = 0;
const OFFERS_MAX_COUNT = 2;

const getRandomOffersIds = (eventType) => {
  const offersIds = getOffersByType(eventType, OFFERS).map((offer) => offer.id);

  if (offersIds.length < 2) {
    return offersIds;
  }

  return getRandomArrayElements(offersIds, getRandomInteger(OFFERS_MIN_COUNT, OFFERS_MAX_COUNT));
};

export { getRandomOffersIds, OFFERS };
