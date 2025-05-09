import dayjs from 'dayjs';

const updateItem = (items, update) => items.map((item) => item.id === update.id ? update : item);

const getDateDifference = (date1, date2) => {
  const start = dayjs(date1);
  const end = dayjs(date2);
  let diff = Math.abs(end.diff(start, 'minute'));

  const days = Math.floor(diff / (24 * 60));
  diff -= days * 24 * 60;
  const hours = Math.floor(diff / 60);
  const minutes = diff % 60;

  if (days > 0) {
    return `${String(days).padStart(2, '0')}D ${String(hours).padStart(2, '0')}H ${String(minutes).padStart(2, '0')}M`;
  } else if (hours > 0) {
    return `${String(hours).padStart(2, '0')}H ${String(minutes).padStart(2, '0')}M`;
  } else {
    return `${String(minutes).padStart(2, '0')}M`;
  }
};

const getTime = (date) => dayjs(date).format('HH:mm');

const getMonthAndDay = (date) => dayjs(date).format('MMM DD');

const getDayAndMonth = (date) => dayjs(date).format('D MMM');

const getFullDate = (date) => dayjs(date).format('DD/MM/YY HH:mm');

const isPastEvent = (date) => dayjs(date).isBefore(dayjs());

const isPresentEvent = (dateFrom, dateTo) => dayjs(dateFrom).isBefore(dayjs()) && dayjs(dateTo).isAfter(dayjs());

const isFutureEvent = (date) => dayjs(date).isAfter(dayjs());

const isSameDate = (date1, date2) => dayjs(date1).isSame(date2, 'd');

const sortByDay = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));

const sortByTime = (pointA, pointB) => dayjs(pointB.dateTo).diff(pointB.dateFrom) - dayjs(pointA.dateTo).diff(pointA.dateFrom);

const sortByPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

const getOffersByType = (type, offers) => offers.find((offer) => offer.type === type)?.offers;

const getOfferById = (id, offers) => offers?.find((offer) => offer.id === id);

const getDestinationById = (id, destinations) => destinations?.find((destination) => destination.id === id);

const getPointsDataRange = (points) => {
  if (!points.length) {
    return { startDate: '', endDate: '' };
  }

  const sortedPoints = points.sort(sortByDay);
  const startDate = getDayAndMonth(sortedPoints[0].dateFrom);
  const endDate = getDayAndMonth(sortedPoints.at(-1).dateTo);

  return { startDate, endDate };
};

const getTripRoute = (points, destinations) => {
  const cities = [];
  const sortedPoints = points.sort(sortByDay);

  sortedPoints.forEach((point) => {
    cities.push(getDestinationById(point.destination, destinations).name);
  });

  return cities;
};

const getTripPrice = (points, offers) =>
  points.reduce((total, { type, basePrice, offers: pointOffers }) => {
    const availableOffers = getOffersByType(type, offers);
    const offersSum = pointOffers
      .reduce((sum, offerId) => sum + getOfferById(offerId, availableOffers).price, 0);
    return total + basePrice + offersSum;
  }, 0);

export {
  updateItem,
  getDateDifference,
  getTime,
  getMonthAndDay,
  getFullDate,
  isPastEvent,
  isPresentEvent,
  isFutureEvent,
  isSameDate,
  sortByDay,
  sortByTime,
  sortByPrice,
  getOffersByType,
  getOfferById,
  getDestinationById,
  getPointsDataRange,
  getTripRoute,
  getTripPrice,
};
