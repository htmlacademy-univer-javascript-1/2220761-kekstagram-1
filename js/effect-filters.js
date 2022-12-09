import { PercentageScale, Effects } from './consts.js';

const scaleValue = document.querySelector('.scale__control--value');
const scaleBigger = document.querySelector('.scale__control--bigger');
const scaleSmaller = document.querySelector('.scale__control--smaller');
const effectValue = document.querySelector('.effect-level__value');
const slider = document.querySelector('.effect-level__slider');
const sliderWrapper = document.querySelector('.img-upload__effect-level');
const imgPreview = document.querySelector('.img-upload__preview').querySelector('img');

const checkScaleClicks = (val) => Math.min(Math.max(val, PercentageScale.MIN), PercentageScale.MAX);

const changeScale = (val) => {
  const sliderNumber = checkScaleClicks(Number(scaleValue.value.replace('%', '')) + PercentageScale.STEP * val);
  imgPreview.style.transform = `scale(${sliderNumber / 100})`;
  scaleValue.value = `${sliderNumber}%`;
};

const onScaleBiggerButtonClick  = () => changeScale(1);
const onScaleSmallerButtonClick = () => changeScale(-1);

export const addEventScaleButton = () => {
  scaleBigger.addEventListener('click', onScaleBiggerButtonClick);
  scaleSmaller.addEventListener('click', onScaleSmallerButtonClick);
};

export const createSlider = () => {
  sliderWrapper.classList.add('hidden');
  noUiSlider.create(slider, {
    range: {min: 0, max: 100}, start: 100, step: 0.1,
    format: {
      to: (value) => (Number.isInteger(value)) ? value.toFixed(0) : value.toFixed(1),
      from: (value) => parseFloat(value),
    },
  });
};

export const updateSliderSettings = (evt) => {
  const effect = evt.target.value;
  if (effect === 'none') {
    sliderWrapper.classList.add('hidden');
    imgPreview.style.filter = 'none';
    return;
  }

  sliderWrapper.classList.remove('hidden');
  imgPreview.removeAttribute('class');
  imgPreview.classList.add(`effects__preview--${effect}`);
  slider.noUiSlider.updateOptions(Effects[effect].options);

  slider.noUiSlider.on('update', () => {
    effectValue.value = slider.noUiSlider.get();
    imgPreview.style.filter = `${Effects[effect].filter}(${effectValue.value}${Effects[effect].unit})`;
  });
};
