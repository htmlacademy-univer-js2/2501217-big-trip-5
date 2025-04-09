const getRandomArrayElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomArrayElements = (arr, num) => [...arr].sort(() => 0.5 - Math.random()).slice(0, num);

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

const updateItem = (items, update) => items.map((item) => item.id === update.id ? update : item);

export {getRandomArrayElement, getRandomArrayElements, getRandomInteger, updateItem};
