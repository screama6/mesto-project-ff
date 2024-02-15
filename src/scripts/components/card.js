import {cardTemplate, placesList} from '../index.js';
import {openPopup} from './modal.js';

function createCard (placeValue, linkValue, likeCallback, ClickImageCallback, deleteCard) {
  
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardImage.src = linkValue;
  cardImage.alt = placeValue;
  cardTitle.textContent = placeValue;

  cardDeleteButton.addEventListener('click', deleteCard);
  
  likeButton.addEventListener('click', likeCallback);

  cardImage.addEventListener('click', function () {
    ClickImageCallback(linkValue, placeValue);
  });

  return cardElement
}

function handleClickImage (imageSrc, imageTitle) {
  const popupImage = document.querySelector('.popup_type_image');
  const popupImageContent = popupImage.querySelector('.popup__image');
  const popupCaptionContent = popupImage.querySelector('.popup__caption');

  popupImageContent.src = imageSrc;
  popupImageContent.alt = imageTitle;
  popupCaptionContent.textContent = imageTitle;
  openPopup(popupImage);
}

export function editProfileFormSubmit(nameInput, jobInput) {
  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');

  profileTitle.textContent = nameInput;
  profileDescription.textContent = jobInput;
}

export const createnewCard = (nameValue, linkValue) => {
  const newCard = createCard(nameValue, linkValue, toggleLike, handleClickImage, deleteCard);
  placesList.prepend(newCard);
}

function toggleLike (evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

function deleteCard (cardDeleteButton) {
  const listItem = cardDeleteButton.target.closest('.places__item');
  listItem.remove();
}

export const renderCard = (placeValue, linkValue) => {
  const newCard = createCard(placeValue, linkValue, toggleLike, handleClickImage, deleteCard);
  placesList.append(newCard);
}