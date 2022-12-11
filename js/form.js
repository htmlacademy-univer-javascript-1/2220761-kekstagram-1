import { MAX_HASHTAGS, MAX_HASHTAG_SYMBOLS, MAX_STRING_LENGTH, ErrorMessages } from './consts.js';
import { updateSliderSettings, addEventScaleButton, createSlider } from './effect-filters.js';
import { renderMessage } from './message.js';
import { sendData } from './api.js';

const submitButton = document.querySelector('.img-upload__submit');
const uploadFileButton = document.querySelector('#upload-file');
const editingForm = document.querySelector('.img-upload__overlay');
const form = document.querySelector('.img-upload__form');
const closeEditingFormButton = form.querySelector('.img-upload__cancel');

const hashtagsField = form.querySelector('.text__hashtags');
const commentsField = form.querySelector('.text__description');
const imgPreview = document.querySelector('.img-upload__preview').querySelector('img');
const uploadEffects = document.querySelector('.img-upload__effects');
const body = document.querySelector('body');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text'
});

let errorMessage = '';
const error = () => errorMessage;

const hashtagHandler = (value) => {
  const inputText = value.toLowerCase().trim();

  if (!inputText) {
    return true;
  }

  const inputArray = inputText.split(/\s+/);

  if (inputArray.lenght === 0) {
    return true;
  }

  const rules = [
    {
      check: inputArray.some((item) => item.indexOf('#', 1) >= 1),
      error: ErrorMessages.SEPARATED_BY_SPACES,
    },
    {
      check: inputArray.some((item) => item[0] !== '#'),
      error: ErrorMessages.START_WITH,
    },
    {
      check: inputArray.some((item, num, arr) => arr.includes(item, num + 1)),
      error: ErrorMessages.NO_REPEAT,
    },
    {
      check: inputArray.some((item) => item.length > MAX_HASHTAG_SYMBOLS),
      error: ErrorMessages.HASHTAG_MAX_LENGTH,
    },
    {
      check: inputArray.length > MAX_HASHTAGS,
      error: ErrorMessages.MAX_COUNT_HASHTAG,
    },
    {
      check: inputArray.some((item) => !/^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/i.test(item)),
      error: ErrorMessages.UNACCEPTABLE_SYMBOLS,
    },
  ];

  return rules.every((rule) => {
    errorMessage = '';
    const isInvalid = rule.check;
    if (isInvalid) {
      errorMessage = rule.error;
    }
    return !isInvalid;
  });
};

const buttonAdjustment = () => {
  submitButton.disabled = !pristine.validate();
};

const validateForm = () => {
  pristine.addValidator(hashtagsField, hashtagHandler, error);
  pristine.addValidator(commentsField, (value) => value.length <= MAX_STRING_LENGTH, ErrorMessages.COMMENT_MAX_LENGTH);
  buttonAdjustment();
};

const onInputHashtag = () => buttonAdjustment();
const onInputComment = () => buttonAdjustment();

hashtagsField.addEventListener('input', onInputHashtag);
commentsField.addEventListener('input', onInputComment);

hashtagsField.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
});

commentsField.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
});

const closeForm = () => {
  body.classList.remove('modal-open');
  editingForm.classList.add('hidden');
  document.querySelector('.img-upload__effect-level').classList.add('hidden');
  uploadFileButton.value = '';
  commentsField.value = '';
  hashtagsField.value = '';
};

const closeFormWithDefaultSettings  = () => {
  closeForm();
  imgPreview.removeAttribute('class');
  imgPreview.removeAttribute('style');
  form.reset();
};

const onEscKeyDown = (evt) => {
  if (evt.key === 'Escape') {
    closeFormWithDefaultSettings();
    document.removeEventListener('keydown', onEscKeyDown);
  }
};

closeEditingFormButton.addEventListener('click', closeForm);

const setFormSubmit = (onSuccess, onError) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    submitButton.disabled = true;
    sendData(
      () => {
        onSuccess();
        renderMessage(true);
      },
      () => {
        onError();
        renderMessage();
      },
      new FormData(evt.target),
    );
  });
};

export const renderUploadForm = () => {
  uploadFileButton.addEventListener('change', () => {
    imgPreview.removeAttribute('class');
    imgPreview.removeAttribute('style');
    editingForm.classList.remove('hidden');
    body.classList.add('modal-open');
    document.addEventListener('keydown', onEscKeyDown);
    buttonAdjustment();
    uploadEffects.addEventListener('change', updateSliderSettings);
    addEventScaleButton();
  });
  createSlider();
  validateForm();
  setFormSubmit(closeFormWithDefaultSettings, closeForm);
};
