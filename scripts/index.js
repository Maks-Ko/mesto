//popup изменения профиля
const openEditProfileButton = document.querySelector('.profile-info__button');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const closeEditProfileButton = document.querySelector('.popup__button');

function togglePopup(event) {
    event.classList.toggle('popup_is-opened');
}

openEditProfileButton.addEventListener('click', function() {
  nameInput.value = nameAvatar.textContent;
  aboutMeInput.value = aboutMeAvatar.textContent;
  togglePopup(popupEditProfile);
});

closeEditProfileButton.addEventListener('click', function() {
  togglePopup(popupEditProfile);
});

function handleOverlayClick(event) {
  const openPopup = document.querySelector('.popup_is-opened');
  if (event.target === event.currentTarget) {    
    togglePopup(openPopup);
  }
}
popupEditProfile.addEventListener('click', handleOverlayClick);

// изменения профиля
const nameAvatar = document.querySelector('.profile-info__title');
const aboutMeAvatar = document.querySelector('.profile-info__text');
const formEditProfile = document.querySelector('.form');
const nameInput = formEditProfile.querySelector('.form__text_edit_name');
const aboutMeInput = formEditProfile.querySelector('.form__text_edit_about-me');


function formEditProfileSubmitHandler (event) {
  event.preventDefault();

  const userName = nameInput.value;
  const userProfession = aboutMeInput.value;

  nameAvatar.textContent = userName;
  aboutMeAvatar.textContent = userProfession;
  
  togglePopup(popupEditProfile);
}
formEditProfile.addEventListener('submit', formEditProfileSubmitHandler);

// popup карточек  
const popupAddCard = document.querySelector('.popup_type_add-card');
const openPopupAddCard = document.querySelector('.profile__button');
const closePopupAddCard = document.querySelector('.popup__button_card')

const formAddCard = popupAddCard.querySelector('.form');
const inputCardName = popupAddCard.querySelector('.form__text_edit_name');
const inputCardPhto = popupAddCard.querySelector('.form__text_edit_about-me');
const cardContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#element-template');

openPopupAddCard.addEventListener('click', function() {
  inputCardName.value = '';
  inputCardPhto.value = '';
  togglePopup(popupAddCard);
});

closePopupAddCard.addEventListener('click', function() {
  togglePopup(popupAddCard);
});

popupAddCard.addEventListener('click', handleOverlayClick);

// создание новой карточки
function createCard (cardData) {
  const newCard = cardTemplate.content.querySelector('.element').cloneNode(true);
  const likeButton = newCard.querySelector('.element__like');
  const cardDeleteButton = newCard.querySelector('.element__delete');
  const openPopupImage = newCard.querySelector('.element__foto');
  
  newCard.querySelector('.element__title').textContent = cardData.name;
  openPopupImage.src = cardData.link;
  openPopupImage.alt = cardData.name;

  likeButton.addEventListener('click', function(like) {
    like.target.closest('.element__like').classList.toggle('element__like_active');
  });

  cardDeleteButton.addEventListener('click', function(del) {
    del.target.closest('.element').remove();
  });

  openPopupImage.addEventListener('click', function() {
    popupImageContent.src = openPopupImage.src;
    popupImageContent.alt = openPopupImage.alt;
    popupImageTitle.textContent = openPopupImage.alt;
    togglePopup(popupImage);
  });

  return newCard;
}

// добавление карточки через initial-cards.js
initialCards.forEach(function(cardData) {
  const cards = createCard(cardData);
  cardContainer.append(cards);
});

// добавление карточки через форму
function formAddCardSubmitHandler (event) {
  event.preventDefault();

  const cardElementFoto = {};
  
  cardElementFoto.name = inputCardName.value;
  cardElementFoto.link = inputCardPhto.value;
  inputCardName.value = '';
  inputCardPhto.value = '';

  const newCardForm = createCard(cardElementFoto);

  cardContainer.prepend(newCardForm);
  togglePopup(popupAddCard);
}
formAddCard.addEventListener('submit', formAddCardSubmitHandler);

//popup картинок
const popupImage = document.querySelector('.popup_type_image');
const closePopupImage = popupImage.querySelector('.images-content__button');
const popupImageContent = popupImage.querySelector('.images-content__foto');
const popupImageTitle = popupImage.querySelector('.images-content__title');

closePopupImage.addEventListener('click', function() {
  togglePopup(popupImage);
});
popupImage.addEventListener('click', handleOverlayClick);