import { pictureOpen  } from './big-picture.js';
import { getPhotosDescription } from './mocks.js';

const getPictureTemplate = ({id, url, comments, likes}) => `<a href="#" class="picture js-picture" data-id="${id}">
<img class="picture__img" src="${url}" width="182" height="182" alt="Случайная фотография">
<p class="picture__info">
  <span class="picture__comments">${comments.length}</span>
  <span class="picture__likes">${likes}</span>
</p>
</a>`;

const mainContainer = document.querySelector('.js-pictures');
const getThumbnails = (data) => mainContainer.insertAdjacentHTML('beforeend', data.map((photo) => getPictureTemplate(photo)).join(''));

const onPictureClick = (evt) => {
  evt.preventDefault();
  const target = evt.target;
  const parent = target.closest('.js-picture');
  const id = parent.dataset.id;
  pictureOpen(getPhotosDescription[id - 1]);
};

export const generatePictures = () => {
  getThumbnails(getPhotosDescription);
  const pictures = document.querySelectorAll('.js-picture');

  pictures.forEach((picture) => {
    picture.addEventListener('click', onPictureClick);
  });
};
