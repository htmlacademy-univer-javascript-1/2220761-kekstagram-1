import { getCommentTemplate } from './thumbnails.js';
import { MAX_SHOWN_COMMENTS } from './consts.js';

const bigPicture = document.querySelector('.big-picture');
const closeButton = document.querySelector('.big-picture__cancel');
const commentsList = bigPicture.querySelector('.social__comments');
const shownCommentsCount = document.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
let actualComments = [];
let renderedCommentsCount  = MAX_SHOWN_COMMENTS;

const getCounterCommentsTemplate = (commentsCount) => `${Math.min(renderedCommentsCount, commentsCount)} из <span class="comments-count">${commentsCount}</span> комментариев`;

const getCounterComments = () => {
  shownCommentsCount.innerHTML = '';
  shownCommentsCount.insertAdjacentHTML('afterbegin', getCounterCommentsTemplate(actualComments.length));
};

const renderComments = () => {
  getCounterComments();
  commentsList.innerHTML = '';
  const commentsTemplate = actualComments.slice(0, renderedCommentsCount).map((comment) => getCommentTemplate(comment)).join('');
  commentsList.insertAdjacentHTML('afterbegin', commentsTemplate);

  if (renderedCommentsCount >= actualComments.length) {
    commentsLoader.removeEventListener('click', onCommentsButtonLoader);
    commentsLoader.classList.add('hidden');
  }
};

const initComments = (comments) => {
  actualComments = comments.slice();
  commentsList.innerHTML='';

  if (comments.length === 0) {
    commentsLoader.classList.add('hidden');
    shownCommentsCount.innerHTML = 'Нет комментариев';
    return;
  }

  renderComments();
  commentsLoader.addEventListener('click', onCommentsButtonLoader);
};

const renderBigPicture = (picture) => {
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.social__caption').textContent = picture.description;
  initComments(picture.comments);
};

const closePicture = () => {
  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  closeButton.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onEscKeyDown);
  commentsLoader.classList.remove('hidden');
  commentsLoader.removeEventListener('click', onCommentsButtonLoader);
  renderedCommentsCount = MAX_SHOWN_COMMENTS;
};

function onEscKeyDown(evt) {
  if (evt.key === 'Escape') {
    closePicture();
  }
}

function onCloseButtonClick() {
  closePicture();
}

function onCommentsButtonLoader() {
  renderedCommentsCount += MAX_SHOWN_COMMENTS;
  renderComments();
}

export const openPicture = (element) => {
  document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  renderBigPicture(element);
  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onEscKeyDown);
};
