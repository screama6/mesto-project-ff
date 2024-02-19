import '../pages/index.css';
import {initialCards} from './components/cards.js';
import {createCard, toggleLike, deleteCard} from './components/card.js';
import {openPopup, closePopup, handleOverlayClick} from './components/modal.js';

const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

const popupList = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const profileInfoTitle = document.querySelector('.profile__title');
const profileInfoDescription = document.querySelector('.profile__description');
const profileAddButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('.profile__edit-button');


const popupImage = document.querySelector('.popup_type_image');
const popupImageContent = popupImage.querySelector('.popup__image');
const popupCaptionContent = popupImage.querySelector('.popup__caption');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const formEditProfile = document.forms['edit-profile'];
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.description;

const formNewPlace = document.forms['new-place'];
const namePlace = formNewPlace.elements['place-name'];
const linkPlace = formNewPlace.elements.link;

formEditProfile.addEventListener('submit', function (evt) {
  evt.preventDefault();
  editProfileFormSubmit(nameInput.value, jobInput.value);
  closePopup(popupEdit);
});

formNewPlace.addEventListener('submit', function (evt){
  evt.preventDefault();
  createnewCard(namePlace.value, linkPlace.value, cardTemplate, handleClickImage, placesList);
  closePopup(popupNewCard);
});

const createnewCard = (nameValue, linkValue) => {
  const newCard = createCard(nameValue, linkValue, cardTemplate, handleClickImage, toggleLike, deleteCard);
  placesList.prepend(newCard);
}

function handleClickImage (imageSrc, imageTitle) {
  popupImageContent.src = imageSrc;
  popupImageContent.alt = imageTitle;
  popupCaptionContent.textContent = imageTitle;
  openPopup(popupImage);
}

function editProfileFormSubmit(nameInput, jobInput) {
  profileTitle.textContent = nameInput;
  profileDescription.textContent = jobInput;
}

function popupEditPlaceholder () {
  nameInput.value = profileInfoTitle.textContent;
  jobInput.value = profileInfoDescription.textContent;
  openPopup(popupEdit);
  }

popupList.forEach((element) => {
  element.classList.add('popup_is-animated');
  const popupClose = element.querySelector('.popup__close');
  popupClose.addEventListener('click', function () {
    closePopup(element);
  });
  element.addEventListener('click', handleOverlayClick);
});

initialCards.forEach((element) => {
  renderCard(element.name, element.link);
});

function renderCard (placeValue, linkValue) {
  const newCard = createCard(placeValue, linkValue, cardTemplate, handleClickImage, toggleLike, deleteCard);
  placesList.append(newCard);
}

profileAddButton.addEventListener('click', function () {
  formNewPlace.reset();
  openPopup(popupNewCard);
}); 
profileEditButton.addEventListener('click', function () {
  popupEditPlaceholder(popupEdit);
});

