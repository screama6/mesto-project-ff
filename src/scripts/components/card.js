import {deleteLike, doesLike} from "./api.js"; 

export function createCard (dataCreateCard, cardTemplate, clickImageCallback) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likesText = cardElement.querySelector('.card__likes');
  
  cardImage.src = dataCreateCard.link;
  cardImage.alt = dataCreateCard.name;
  cardTitle.textContent = dataCreateCard.name;
  likesText.textContent = dataCreateCard.cardLikes.length;

  if (dataCreateCard.userId === dataCreateCard.ownerProfileId) {
    cardDeleteButton.addEventListener('click', function (evt) {
      const listItem = evt.target.closest('.places__item');
      dataCreateCard.deleteCard(listItem, dataCreateCard.cardId)
    });
  } else {
    cardDeleteButton.remove();
  }
  
  dataCreateCard.cardLikes.forEach ((evt) => {
    if (dataCreateCard.userId === evt._id) {
      likeButton.classList.add('card__like-button_is-active');
    } 
    })

  likeButton.addEventListener('click', function (evt) {
    const likes = evt.target;
    toggleLike(likes, dataCreateCard.cardId, likesText);
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
      likesText.textContent = data.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
  } else {
    doesLike(cardId).then(data => {
      evt.classList.add('card__like-button_is-active');
      likesText.textContent = data.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
  }
}