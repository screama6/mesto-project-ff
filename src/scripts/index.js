import '../pages/index.css';
import {initialCards} from './components/cards.js';
import {editProfileFormSubmit, createnewCard, renderCard} from './components/card.js';
import {openPopup, closePopup, popupEditPlaceholder} from './components/modal.js';

export const cardTemplate = document.querySelector('#card-template').content;
export const placesList = document.querySelector('.places__list');
const popup = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
export const profileInfoTitle = document.querySelector('.profile__title');
export const profileInfoDescription = document.querySelector('.profile__description');

export const formEditProfile = document.forms['edit-profile'];
export const nameInput = formEditProfile.elements.name;
export const jobInput = formEditProfile.elements.description;

export const formNewPlace = document.forms['new-place'];
const namePlace = formNewPlace.elements['place-name'];
const linkPlace = formNewPlace.elements.link;

formEditProfile.addEventListener('submit', function (evt) {
  evt.preventDefault();
  editProfileFormSubmit(nameInput.value, jobInput.value);
  closePopup();
});

formNewPlace.addEventListener('submit', function (evt){
  evt.preventDefault();
  createnewCard(namePlace.value, linkPlace.value);
  formNewPlace.reset();
  closePopup();
});

popup.forEach((element) => {
  element.classList.add('popup_is-animated');
});

initialCards.forEach((element) => {
  renderCard(element.name, element.link);
});


document.body.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('profile__add-button')) {
    openPopup(popupNewCard);
  }
  if (evt.target.classList.contains('profile__edit-button')) {
    popupEditPlaceholder(popupEdit);
  }
  if (evt.target.classList.contains('popup__close')) {
    formEditProfile.reset()
    closePopup();
  }
  if (evt.target.classList.contains('popup')) {
    formEditProfile.reset()
    closePopup();
  }
});

