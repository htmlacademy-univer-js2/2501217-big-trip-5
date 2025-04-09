import dayjs from 'dayjs';

const getTwoRandomDates = () => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() + Math.floor(Math.random() * 10 * (Math.random() < 0.5 ? -1 : 1)));

  startDate.setHours(Math.floor(Math.random() * 24));
  startDate.setMinutes(Math.floor(Math.random() * 60));
  startDate.setSeconds(0);

  const daysDifference = Math.floor(Math.random() * 10);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + daysDifference);

  endDate.setHours(Math.floor(Math.random() * 24));
  endDate.setMinutes(Math.floor(Math.random() * 60));

  return [startDate, endDate];
};

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

const getMonthAndDate = (date) => dayjs(date).format('MMM DD');

const getFullDate = (date) => dayjs(date).format('DD/MM/YY HH:mm');

const isPastEvent = (date) => dayjs(date).isBefore(dayjs());

const isPresentEvent = (dateFrom, dateTo) => dayjs(dateFrom).isBefore(dayjs()) && dayjs(dateTo).isAfter(dayjs());

const isFutureEvent = (date) => dayjs(date).isAfter(dayjs());

const sortByDay = (pointA, pointB) => dayjs(pointA.startDatetime).diff(dayjs(pointB.startDatetime));

const sortByTime = (pointA, pointB) => dayjs(pointB.endDatetime).diff(pointB.startDatetime) - dayjs(pointA.endDatetime).diff(pointA.startDatetime);

const sortByPrice = (pointA, pointB) => pointB.price - pointA.price;

const getOffersByType = (type, offers) => offers.find((offer) => offer.type === type)?.offers;

const getOfferById = (id, offers) => offers.find((offer) => offer.id === id);

const getDestinationByCity = (city, destinations) => destinations.find((destination) => destination.city === city);

export {getTwoRandomDates, getDateDifference, getTime, getMonthAndDate, getFullDate, isPastEvent, isPresentEvent, isFutureEvent, sortByDay, sortByTime,
  sortByPrice, getOffersByType, getOfferById, getDestinationByCity};
