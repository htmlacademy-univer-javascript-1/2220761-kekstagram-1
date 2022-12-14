import { renderUploadForm } from './form.js';
import { getData } from './api.js';
import { showAlert } from './utils.js';
import { initFilters } from './filter.js';

getData(
  (photos) => initFilters(photos),
  () => showAlert(),
);
renderUploadForm();
