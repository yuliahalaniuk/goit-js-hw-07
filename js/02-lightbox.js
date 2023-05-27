import { galleryItems } from "./gallery-items.js";

const galleryEl = document.querySelector(".gallery");

function createGalleryEl(items) {
  const galleryItemCode = items
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
        <a class="gallery__link" href="${original}">
        <img class="gallery__image" src="${preview}" alt="${description}" />
        </a>
        </li>
      `;
    })
    .join("");
  galleryEl.innerHTML = galleryItemCode;
  return galleryEl;
}

createGalleryEl(galleryItems);

const lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});
