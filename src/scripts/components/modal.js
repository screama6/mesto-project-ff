import {formNewPlace, formEditProfile, profileInfoTitle, profileInfoDescription, nameInput, jobInput} from '../index.js';

export function popupEditPlaceholder (popupEdit) {
nameInput.value = profileInfoTitle.textContent;
jobInput.value = profileInfoDescription.textContent;
openPopup(popupEdit);
}

export function openPopup (openPopup) {
  openPopup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupByEsc);
}

export function closePopup () {
  const popupOpened = document.querySelector('.popup_is-opened');
  popupOpened.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupByEsc);
  formNewPlace.reset();
}

export function closePopupByEsc (evt) {
  if (evt.key === 'Escape') {
    formEditProfile.reset()
    closePopup();
  }
}