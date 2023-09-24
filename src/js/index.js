import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { UnsplashAPI } from "./unsplash-api";
import { galleryEl, formEl, loadMoreBtn } from "./refs";
import { hideLoader, showLoader, hideMoreBtn, showMoreBtn } from "./function";
import { createGellaryCard } from "./gellary-card";
const unsplashAPI = new UnsplashAPI(12);
let simpleLightBox;
formEl.addEventListener("submit", onSubmit);
loadMoreBtn.addEventListener("click", onMoreData);

function onSubmit (event) {
  event.preventDefault();
  unsplashAPI.page = 1;
  
  const searchQuery = event.currentTarget.elements['user-search-query'].value.trim();

  if (!searchQuery) {
    return Notiflix.Notify.failure('Please enter some value');
  }

  showLoader();

  unsplashAPI.query = searchQuery;

  unsplashAPI.getPhotos().then(resp => {
    galleryEl.innerHTML = createGellaryCard(resp.results);
    simpleLightBox = new SimpleLightbox('.gallery a').refresh();
    Notiflix.Notify.success(`Hi we found ${resp.total} fotos`)
    if (resp.total < unsplashAPI.perPage) return;
    showMoreBtn();

  }).catch(error => {
    console.log(error);
  }).finally( () => {
    hideLoader();
    
  })
}

function onMoreData (event) {
  unsplashAPI.page += 1;
  simpleLightBox.destroy();
  unsplashAPI.getPhotos().then(resp => {
    galleryEl.insertAdjacentHTML('beforeend', createGellaryCard(resp.results));
    simpleLightBox = new SimpleLightbox('.gallery a').refresh();
    if (unsplashAPI.page === resp.total_pages) {
    hideMoreBtn();
    Notiflix.Notify.failure("You reached the end")
  }
  }).catch(error => {
    console.log(error);
  })
}