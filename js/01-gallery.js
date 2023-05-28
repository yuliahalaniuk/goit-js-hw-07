import { galleryItems } from "./gallery-items.js";

const galleryEl = document.querySelector(".gallery");

function createGalleryEl(items) {
  const galleryItemCode = items
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
            <a class="gallery__link" href="${original}">
              <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
              />
            </a>
          </li>`;
    })
    .join("");

  galleryEl.innerHTML = galleryItemCode;
  return galleryEl;
}

createGalleryEl(galleryItems);

function onGalleryItemClick(evt) {
  const { target } = evt;
  evt.preventDefault();
  if (target.nodeName !== "IMG") {
    return;
  }

  openModal(target.dataset.source, target.alt);
}

function openModal(url, descr) {
  const modalImg = `
     <img src="${url}" width="800" height="600" alt="${descr}">
    `;

  const instance = basicLightbox.create(modalImg, {
    onShow: () => {
      document.addEventListener("keydown", onEscKeyPress);
    },
    onClose: () => {
      document.removeEventListener("keydown", onEscKeyPress);
    },
  });

  const onEscKeyPress = (evt) => {
    if (evt.code === "Escape") {
      instance.close();
    }
  };

  instance.show();
}

galleryEl.addEventListener("click", onGalleryItemClick);
