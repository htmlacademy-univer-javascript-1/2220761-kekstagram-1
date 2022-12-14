import { debounce, shuffleArray } from './utils.js';
import { generatePictures, removeThumbnails } from './thumbnails.js';

const MAX_COUNT_RANDOM_PHOTO = 10;
const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const filtersContainer = document.querySelector('.img-filters');
const filtersForm = filtersContainer.querySelector('.img-filters__form');

let photos = [];

const getFilteredPhotos = (filterName) => {
  let filteredPhotos = [];

  switch(filterName){
    case Filter.RANDOM:
      filteredPhotos = shuffleArray(photos).slice(0, MAX_COUNT_RANDOM_PHOTO);
      break;
    case Filter.DISCUSSED:
      filteredPhotos = photos.slice().sort((pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length);
      break;
    default:
      filteredPhotos = photos.slice();
  }
  return filteredPhotos;
};

const onFiltersFormClick = (evt) => {
  const filterName = evt.target.id;
  removeThumbnails();
  generatePictures(getFilteredPhotos(filterName));
  filtersContainer.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  evt.target.classList.add('img-filters__button--active');
};

export const initFilters = (data) => {
  photos = data.slice();
  generatePictures(photos);
  filtersContainer.classList.remove('img-filters--inactive');
  filtersForm.addEventListener('click', debounce(onFiltersFormClick));
};
