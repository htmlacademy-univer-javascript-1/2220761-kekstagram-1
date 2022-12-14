import { openPicture } from './big-picture.js';

const getPictureTemplate = ({id, url, comments, likes}) => `<a href="#" class="picture js-picture" data-id="${id}">
<img class="picture__img" src="${url}" width="182" height="182" alt="Случайная фотография">
<p class="picture__info">
  <span class="picture__comments">${comments.length}</span>
  <span class="picture__likes">${likes}</span>
</p>
</a>`;

export const getCommentTemplate = ({avatar, message, name}) => `<li class="social__comment">
  <img class="social__picture" src="${avatar}" alt="${name}" width="35" height="35">
  <p class="social__text">${message}</p>
</li>`;

let data = [];

const mainContainer = document.querySelector('.js-pictures');
const getThumbnails = () => mainContainer.insertAdjacentHTML('beforeend', data.map((photo) => getPictureTemplate(photo)).join(''));

const onPictureClick = (evt) => {
  evt.preventDefault();
  const target = evt.target;
  const parent = target.closest('.js-picture');
  const id = +parent.dataset.id;
  const [ photo ] = data.filter((item) => item.id === id);
  openPicture(photo);
};

export const removeThumbnails = () => {
  const pictures = document.querySelectorAll('.js-picture');
  pictures.forEach((picture) => picture.remove());
};

export const generatePictures = (photos) => {
  data = photos.slice();
  getThumbnails();
  const pictures = document.querySelectorAll('.js-picture');

  pictures.forEach((picture) => {
    picture.addEventListener('click', onPictureClick);
  });
};
