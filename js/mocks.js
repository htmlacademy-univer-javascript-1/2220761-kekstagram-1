import {getRandomArrayElement, getRandomPositiveInteger} from './utils.js';
import { MESSAGES, NAMES, MAX_COUNT_COMMENTS, DESCRIPTIONS, MIN_LIKES, MAX_LIKES, MAX_COUNT_PHOTOS } from './consts.js';

const createComments = (id) => ({
  id,
  avatar: `img/avatar-${getRandomPositiveInteger(1, MAX_COUNT_COMMENTS)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const createPhotosDescription = (id) => ({
  id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomPositiveInteger(MIN_LIKES, MAX_LIKES),
  comments: Array.from({length: getRandomPositiveInteger(1, MAX_COUNT_COMMENTS)}).map((_, index) => createComments(index + 1)),
});

export const getPhotosDescription = Array.from({length: MAX_COUNT_PHOTOS}).map((_, index) => createPhotosDescription(index + 1));
