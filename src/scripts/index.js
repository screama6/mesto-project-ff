import '../pages/index.css';
import {createCard} from './components/card.js';
import {openPopup, closePopup, handleOverlayClick} from './components/modal.js';
import {enableValidation, clearValidation} from './components/validation.js';
import {getData, editProfile, getInitialCards, addCards, editAvatar} from './components/api.js';

const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

const popupList = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupEditAvatar = document.querySelector('.popup_type_edit-avatar'); 
const profileInfoTitle = document.querySelector('.profile__title');
const profileInfoDescription = document.querySelector('.profile__description');
const profileAddButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('.profile__edit-button');

const popupImage = document.querySelector('.popup_type_image');
const popupImageContent = popupImage.querySelector('.popup__image');
const popupCaptionContent = popupImage.querySelector('.popup__caption');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

const formEditProfile = document.forms['edit-profile'];
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.description;

const formNewPlace = document.forms['new-place'];
const namePlace = formNewPlace.elements['place-name'];
const linkPlace = formNewPlace.elements.link;

const formEditAvatar = document.forms['edit-avatar'];
const linkAvatar = formEditAvatar.elements.link;

let userId = '';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

formEditProfile.addEventListener('submit', function (evt) {
  evt.preventDefault();
  renderLoading(evt.submitter, true);
  editProfile(nameInput.value, jobInput.value).then((input) => {
    editProfileFormSubmit(input.name, input.about)
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    renderLoading(evt.submitter, false);
  });
  closePopup(popupEdit);
});

formNewPlace.addEventListener('submit', function (evt){
  evt.preventDefault();
  renderLoading(evt.submitter, true);
  addCards(namePlace.value, linkPlace.value).then((input) => {
    const dataCreateCard = {
      name: input.name,
      link: input.link,
      userId: userId,
      ownerProfileId: input.owner._id,
      cardId: input._id,
      cardLikes: input.likes
    }
    createnewCard(dataCreateCard);
    closePopup(popupNewCard);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    renderLoading(evt.submitter, false);
  }); 
});

formEditAvatar.addEventListener('submit', function (evt){
  evt.preventDefault();
  renderLoading(evt.submitter, true);
  editAvatar(linkAvatar.value).then((input) => {
    editProfileAvatar(input.avatar)
    closePopup(popupEditAvatar);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    renderLoading(evt.submitter, false);
  }); 
});

const createnewCard = (dataCreateCard) => {
  const newCard = createCard(dataCreateCard, cardTemplate, handleClickImage);
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

function editProfileAvatar(profileAvatar) {
  profileImage.style.backgroundImage = `url('${profileAvatar}')`;
}

function dataProfile(nameInput, jobInput, profileAvatar) {
  profileTitle.textContent = nameInput;
  profileDescription.textContent = jobInput;
  profileImage.style.backgroundImage = `url('${profileAvatar}')`;
}

function popupEditPlaceholder () {
  nameInput.value = profileInfoTitle.textContent;
  jobInput.value = profileInfoDescription.textContent;
  openPopup(popupEdit);
}

function renderLoading (buttonElement, isLoading) {
  if (isLoading) {
    buttonElement.textContent = 'Сохранение...'
  } else {
    buttonElement.textContent = 'Сохранить'
  }
}

popupList.forEach((element) => {
  element.classList.add('popup_is-animated');
  const popupClose = element.querySelector('.popup__close');
  popupClose.addEventListener('click', function () {
    closePopup(element);
  });
  element.addEventListener('click', handleOverlayClick);
  
});

getData().then(res => {
  const [getProfile, getInitialCards] = res;
  userId = getProfile._id
  getInitialCards.forEach ((element) => {
    const dataCreateCard = {
      name: element.name,
      link: element.link,
      userId: userId,
      ownerProfileId: element.owner._id,
      cardId: element._id,
      cardLikes: element.likes
    }
    renderCard(dataCreateCard);
  })
  dataProfile(getProfile.name, getProfile.about, getProfile.avatar)
})
.catch((err) => {
  console.log(err);
}); 

function renderCard (dataCreateCard) {
  const newCard = createCard(dataCreateCard, cardTemplate, handleClickImage);
  placesList.append(newCard);
}

profileAddButton.addEventListener('click', function () {
  formNewPlace.reset();
  clearValidation(formNewPlace, validationConfig);
  openPopup(popupNewCard);
}); 
profileEditButton.addEventListener('click', function () {
  popupEditPlaceholder(popupEdit);
  clearValidation(popupEdit, validationConfig);
});

profileImage.addEventListener('click', function () {
  formEditAvatar.reset();
  openPopup(popupEditAvatar);
  clearValidation(popupEditAvatar, validationConfig);
})

enableValidation(validationConfig);

getInitialCards();