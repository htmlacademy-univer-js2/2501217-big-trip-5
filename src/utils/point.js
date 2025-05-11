import dayjs from 'dayjs';

export const updateItem = (items, updated) => items.map((item) => item.id === updated.id ? updated : item);

export const getDateDifference = (date1, date2) => {
  const minutesInHour = 60;
  const minutesInDay = 24 * minutesInHour;
  const diffMinutes = Math.abs(dayjs(date2).diff(dayjs(date1), 'minute'));
  const days = Math.floor(diffMinutes / minutesInDay);
  const hours = Math.floor((diffMinutes - days * minutesInDay) / minutesInHour);
  const minutes = diffMinutes % minutesInHour;

  if (days > 0) {
    return `${String(days).padStart(2, '0')}D ${String(hours).padStart(2, '0')}H ${String(minutes).padStart(2, '0')}M`;
  }
  if (hours > 0) {
    return `${String(hours).padStart(2, '0')}H ${String(minutes).padStart(2, '0')}M`;
  }
  return `${String(minutes).padStart(2, '0')}M`;
};

export const getTime = (date) => dayjs(date).format('HH:mm');
export const getMonthAndDay = (date) => dayjs(date).format('MMM DD');
export const getDayAndMonth = (date) => dayjs(date).format('D MMM');
export const getFullDate = (date) => dayjs(date).format('DD/MM/YY HH:mm');

export const isPastEvent = (date) => dayjs(date).isBefore(dayjs());
export const isPresentEvent = (from, to) => dayjs(from).isBefore(dayjs()) && dayjs(to).isAfter(dayjs());
export const isFutureEvent = (date) => dayjs(date).isAfter(dayjs());
export const isSameDates = (date1, date2) => dayjs(date1).isSame(date2);

export const sortByDay = (a, b) => dayjs(a.dateFrom).diff(dayjs(b.dateFrom));
export const sortByTime = (a, b) => dayjs(b.dateTo).diff(dayjs(b.dateFrom)) - dayjs(a.dateTo).diff(dayjs(a.dateFrom));
export const sortByPrice = (a, b) => b.basePrice - a.basePrice;

export const getOffersByType = (type, offersList) => offersList.find((offer) => offer.type === type)?.offers;
export const getOfferById = (id, offersList) => offersList.find((offer) => offer.id === id);
export const getDestinationById = (id, destinations) => destinations.find((destination) => destination.id === id);

export const getPointsDataRange = (points) => {
  if (!points.length) {
    return { startDate: '', endDate: '' };
  }
  const sorted = [...points].sort(sortByDay);
  return {
    startDate: getDayAndMonth(sorted[0].dateFrom),
    endDate: getDayAndMonth(sorted.at(-1).dateTo),
  };
};

export const getTripRoute = (points, destinations) => {
  const sortedPoints = [...points].sort(sortByDay);
  return sortedPoints.map((point) => getDestinationById(point.destination, destinations).name);
};

export const getTripPrice = (points, offersList) =>
  points.reduce((total, { type, basePrice, offers }) => {
    const available = getOffersByType(type, offersList) || [];
    const offersSum = offers.reduce((sum, id) => sum + (getOfferById(id, available)?.price || 0), 0);
    return total + basePrice + offersSum;
  }, 0);
