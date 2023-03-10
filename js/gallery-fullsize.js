import { photoDescriptions } from './data.js';
import { isEscapeKey } from './util.js';

const miniaturesElement = document.querySelector('.pictures');
const bigPictureSection = document.querySelector('.big-picture');
const bigPictureClose = bigPictureSection.querySelector('.big-picture__cancel');
const bigPictureImage = bigPictureSection.querySelector(
  '.big-picture__img > img'
);
const bigPictureLikesCount = bigPictureSection.querySelector('.likes-count');
const bigPictureCommentsCount =
  bigPictureSection.querySelector('.comments-count');
const bigPictureDescription =
  bigPictureSection.querySelector('.social__caption');
const bigPictureCommentsSection =
  bigPictureSection.querySelector('.social__comments');
const bigPictureCommentsCounter = bigPictureSection.querySelector(
  '.social__comment-count'
);
const bigPictureCommentsLoader =
  bigPictureSection.querySelector('.comments-loader');

const openBigPicture = (miniature) => {
  document.body.classList.add('modal-open');
  bigPictureSection.classList.remove('hidden');
  bigPictureCommentsCounter.classList.add('hidden');
  bigPictureCommentsLoader.classList.add('hidden');

  const pictureId = miniature.getAttribute('data-photo-id');
  const pictureData = photoDescriptions.find(
    // eslint-disable-next-line eqeqeq
    (element) => element.id == pictureId
  );

  bigPictureImage.src = pictureData.url;
  bigPictureLikesCount.textContent = pictureData.likes;
  bigPictureCommentsCount.textContent = pictureData.comments.length;
  bigPictureDescription.textContent = pictureData.description;
  bigPictureCommentsSection.innerHTML = '';
  pictureData.comments.forEach((comment) =>
    bigPictureCommentsSection.insertAdjacentHTML(
      'beforeend',
      `
      <li class="social__comment">
        <img
          class="social__picture"
          src="${comment.avatar}"
          alt="${comment.name}"
          width="35" height="35"
        >
        <p class="social__text">${comment.message}</p>
      </li>
    `
    )
  );
};

const closeBigPicture = () => {
  bigPictureSection.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

miniaturesElement.addEventListener('click', (evt) => {
  if (evt.target.closest('.picture')) {
    evt.preventDefault();
    const miniature = evt.target.closest('.picture');
    openBigPicture(miniature);
  }
});

bigPictureClose.addEventListener('click', closeBigPicture);

document.addEventListener('keydown', () => {
  if (isEscapeKey) {
    closeBigPicture();
  }
});
