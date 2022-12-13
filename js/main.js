import { generatePictures } from './thumbnails.js';
import { renderUploadForm } from './form.js';
import { getData } from './api.js';
import { showAlert } from './utils.js';

getData(
  (photos) => generatePictures(photos),
  () => showAlert(),
);
renderUploadForm();
