import {getRandomArrayElement, getRandomPositiveInteger} from './util.js';

const MESSAGES = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const NAMES = ['Екатерина','Дмитрий','Николай','Иван','София','Владимир','Анастасия', 'Елизавета'];

const DESCRIPTIONS = ['Всегда начинайте свой день с хороших людей и кофе.',
  'Мечтайте. Поверьте, в это. Добейтесь этого.',
  'Это просто моя жизнь в моем неповторимом стиле.',
  'Жить — это так здорово.',
  'Селфи вместо тысячи слов.',
  'Фотография ни стоит ничего, но воспоминания бесценны.'];

const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MAX_COUNT_PHOTOS = 25;
const MAX_COUNT_COMMENTS = 6;

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
  comments: Array.from({length: getRandomPositiveInteger(1, MAX_COUNT_COMMENTS)}).map((element, index) => createComments(index + 1)),
});

const getPhotosDescription = () => Array.from({length: MAX_COUNT_PHOTOS}).map((element, index) => createPhotosDescription(index + 1));

export {getPhotosDescription};
