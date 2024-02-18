export function openPopup (popupElement) {
  popupElement.classList.add('popup_is-opened');
  const popupIsOpened = document.querySelector('.popup_is-opened');
  const popupClose = popupIsOpened.querySelector('.popup__close');
  popupClose.addEventListener('click', function () {
    closePopup(popupIsOpened);
  });
  document.addEventListener('click', handleOverlayClick);
  document.addEventListener('keydown', closePopupByEsc);
}

export function closePopup (popupIsOpened) {
  popupIsOpened.querySelector('.popup__close').removeEventListener('click', function () {
    closePopup(popupIsOpened)
  });
  popupIsOpened.classList.remove('popup_is-opened');
  document.removeEventListener('click', handleOverlayClick)
  document.removeEventListener('keydown', closePopupByEsc);
}

function closePopupByEsc (evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_is-opened'));
  }
}

function handleOverlayClick (evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup(document.querySelector('.popup_is-opened'));
  }
}