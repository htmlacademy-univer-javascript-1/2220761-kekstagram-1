const bigPicture = document.querySelector('.big-picture');
const closeButton = document.querySelector('.big-picture__cancel');

const renderComments = (comments) => {
  const fragment = document.createDocumentFragment();
  const socialComments = document.querySelector('.social__comments');

  comments.forEach((comment) => {
    const newComment = document.querySelector('.social__comment').cloneNode(true);
    newComment.querySelector('.social__picture').src = comment.avatar;
    newComment.querySelector('.social__picture').alt = comment.name;
    newComment.querySelector('.social__text').textContent = comment.message;
    fragment.appendChild(newComment);
  });

  socialComments.innerHTML = '';
  socialComments.appendChild(fragment);
};

const renderBigPicture = (picture) => {
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.social__caption').textContent = picture.description;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');

  renderComments(picture.comments);
};

const pictureClose = () => {
  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
};

const onEscKeyDown = (evt) => {
  if (evt.key === 'Escape') {
    pictureClose();
    document.removeEventListener('keydown', onEscKeyDown);
  }
};

export const pictureOpen = (element) => {
  document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  renderBigPicture(element);
  closeButton.addEventListener('click', pictureClose);
  document.addEventListener('keydown', onEscKeyDown);
};
