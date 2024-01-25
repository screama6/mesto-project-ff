const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

function createCard (placeValue, linkValue, deleteCard) {
  
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__image').src = linkValue;
    cardElement.querySelector('.card__image').alt = placeValue;
    cardElement.querySelector('.card__title').textContent = placeValue;

    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    cardDeleteButton.addEventListener('click', deleteCard);
    return cardElement
}

function deleteCard (cardDeleteButton) {
  const listItem = cardDeleteButton.target.closest('.places__item');
  listItem.remove();
}

const renderCard = (placeValue, linkValue) => {
  const newCard = createCard(placeValue, linkValue, deleteCard);
  placesList.append(newCard);
}

initialCards.forEach((element) => {
  renderCard(element.name, element.link)
});