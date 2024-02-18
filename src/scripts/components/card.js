export function createCard (placeValue, linkValue, cardTemplate, clickImageCallback, likeCallback, deleteCard) {
  
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
    clickImageCallback(linkValue, placeValue);
  });

  return cardElement
}

export const createnewCard = (nameValue, linkValue, cardTemplate, handleClickImage, placesList) => {
  const newCard = createCard(nameValue, linkValue, cardTemplate, handleClickImage, toggleLike, deleteCard);
  placesList.prepend(newCard);
}

export function toggleLike (evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

export function deleteCard (cardDeleteButton) {
  const listItem = cardDeleteButton.target.closest('.places__item');
  listItem.remove();
}