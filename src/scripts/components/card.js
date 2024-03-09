import {deleteCards, deleteLike, doesLike} from "./api.js"; 
import {openPopup, closePopup} from './modal.js';

export function createCard (dataCreateCard, cardTemplate, clickImageCallback) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likesText = cardElement.querySelector('.card__likes');

  const popupDeleteCard = document.querySelector('.popup_type_delete-card');
  const formDeleteCard = document.forms['delete-card'];
  
  cardImage.src = dataCreateCard.link;
  cardImage.alt = dataCreateCard.name;
  cardTitle.textContent = dataCreateCard.name;
  likesText.textContent = dataCreateCard.cardLikes.length;

  if (dataCreateCard.userId === dataCreateCard.ownerProfileId) {
    cardDeleteButton.addEventListener('click', function (cardDeleteButton) {
      const listItem = cardDeleteButton.target.closest('.places__item');
      formDeleteCard.reset();
      openPopup(popupDeleteCard);
      formDeleteCard.addEventListener('submit', function (evt) {
        evt.preventDefault();
        deleteCards(dataCreateCard.cardId);
        deleteCard(listItem);
        closePopup(popupDeleteCard);
      }, { once: true })
    });
    
  } else {
   
    cardDeleteButton.remove()
  }
  
  dataCreateCard.cardLikes.forEach ((evt) => {
    if (dataCreateCard.userId === evt._id) {
      likeButton.classList.add('card__like-button_is-active')
      
    } 
    })

  likeButton.addEventListener('click', function (like) {
    const likes = like.target
    toggleLike(likes, dataCreateCard.cardId, likesText)
  });

  cardImage.addEventListener('click', function () {
    clickImageCallback(dataCreateCard.link,dataCreateCard.name);
  });

  return cardElement
}

function toggleLike (evt, cardId, likesText) {
  if (evt.classList.contains('card__like-button_is-active')) {
    deleteLike(cardId).then(data => {
      evt.classList.remove('card__like-button_is-active');
      likesText.textContent = data.likes.length
    })
    .catch((err) => {
      console.log(err);
    });
  } else {
    doesLike(cardId).then(data => {
      evt.classList.add('card__like-button_is-active');
      likesText.textContent = data.likes.length
    })
    .catch((err) => {
      console.log(err);
    });
  }
}

function deleteCard (listItem) {
  listItem.remove();
}