export function openPopup (popupElement) {
  popupElement.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupByEsc);
}

export function closePopup (popupOpen) {
  popupOpen.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupByEsc);
}

function closePopupByEsc (evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_is-opened'));
  }
}

export function handleOverlayClick (evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
  
}