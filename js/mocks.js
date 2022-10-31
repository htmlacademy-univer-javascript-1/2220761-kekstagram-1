import { getRandomElement, getRandomPositiveInteger } from './utils.js';
import {MESSAGES, NAMES, CountComments, DESCRIPTIONS, CountLikes, MAX_COUNT_PHOTOS } from './consts.js';

const createComments = (id) => ({
  id,
  avatar: `img/avatar-${getRandomPositiveInteger(CountComments.MIN, CountComments.MAX)}.svg`,
  message: getRandomElement(MESSAGES),
  name: getRandomElement(NAMES),
});

const createPhotosDescription = (id) => ({
  id,
  url: `photos/${id}.jpg`,
  description: getRandomElement(DESCRIPTIONS),
  likes: getRandomPositiveInteger(CountLikes.MIN, CountLikes.MAX),
  comments: Array.from({length: getRandomPositiveInteger(CountComments.MIN, CountComments.MAX)}).map((_, index) => createComments(index + 1)),
});

export const getPhotosDescription = Array.from({length: MAX_COUNT_PHOTOS}).map((_, index) => createPhotosDescription(index + 1));
