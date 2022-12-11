export const MESSAGES = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

export const NAMES = ['Екатерина','Дмитрий','Николай','Иван','София','Владимир','Анастасия', 'Елизавета'];

export const DESCRIPTIONS = ['Всегда начинайте свой день с хороших людей и кофе.',
  'Мечтайте. Поверьте, в это. Добейтесь этого.',
  'Это просто моя жизнь в моем неповторимом стиле.',
  'Жить — это так здорово.',
  'Селфи вместо тысячи слов.',
  'Фотография ни стоит ничего, но воспоминания бесценны.'];

export const Effects = {
  'none': { name: 'none', filter: '', unit: '',
    options: {range: {min: 0, max: 100}, step: 1, start: 100},
  },
  'chrome': {name: 'chrome', filter: 'grayscale', unit: '',
    options: { range: {min: 0, max: 1}, step: 0.1, start: 1},
  },
  'sepia': { name: 'sepia', filter: 'sepia', unit: '',
    options: { range: {min: 0, max: 1}, step: 0.1, start: 1},
  },
  'marvin': { name: 'marvin', filter: 'invert', unit: '%',
    options: {range: {min: 0, max: 100}, step: 1, start: 100},
  },
  'phobos': {name: 'phobos', filter: 'blur', unit: 'px',
    options: {range: {min: 0, max: 3}, step: 0.1, start: 3},
  },
  'heat': {name: 'heat', filter: 'brightness', unit: '',
    options: {range: {min: 1, max: 3}, step: 0.1, start: 3},
  }
};

export const CountLikes = {
  MIN: 15,
  MAX: 200
};

export const CountComments = {
  MIN: 0,
  MAX: 10
};

export const PercentageScale = {
  STEP: 25,
  MIN: 25,
  MAX: 100
};

export const MAX_COUNT_PHOTOS = 25;
export const MAX_HASHTAG_SYMBOLS = 20;
export const MAX_HASHTAGS = 5;
export const MAX_STRING_LENGTH = 140;
export const MAX_SHOWN_COMMENTS = 5;
export const ALERT_SHOW_TIME = 5000;

export const ErrorMessages = {
  SEPARATED_BY_SPACES: 'Хэш-теги разделяются пробелами',
  START_WITH: 'Хэш-тег должен начинаться с символа #',
  NO_REPEAT: 'Хэш-теги не должны повторяться',
  HASHTAG_MAX_LENGTH: `Максимальная длина одного хэш-тега ${MAX_HASHTAG_SYMBOLS} символов, включая решётку`,
  MAX_COUNT_HASHTAG: `Нельзя указывать больше ${MAX_HASHTAGS} хэш-тегов`,
  UNACCEPTABLE_SYMBOLS: 'Хэш-тег содержит недопустимые символы',
  COMMENT_MAX_LENGTH: `Длина комментария не может составлять больше ${MAX_STRING_LENGTH} символов`
};
