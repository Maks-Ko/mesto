import { Card } from './Card.js';
import { initialCards, keyEscape, config, profileForm, cardForm } from './initial-сards.js';
import { FormValidator } from './FormValidator.js';
export { openPopup, popupImage, popupImageContent, popupImageTitle };

const profileFormValidator = new FormValidator(config, profileForm);
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(config, cardForm);
cardFormValidator.enableValidation();

//popup изменения профиля
const openEditProfileButton = document.querySelector('.profile-info__button');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const closeEditProfileButton = document.querySelector('.popup__button');

// функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', cloceEsc);
}

// функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', cloceEsc);
}

// функция закрытия попапа кликом на оверлей
function handleOverlayClick(event) {
  const openPopup = document.querySelector('.popup_is-opened');
  if (event.target === event.currentTarget) {    
    closePopup(openPopup);
  }
}

// функция закрытия попапа нажатием на Esc
function cloceEsc(evt) {
  const openPopup = document.querySelector('.popup_is-opened');
  if (evt.key === keyEscape) {
    closePopup(openPopup);
  }
}

openEditProfileButton.addEventListener('click', function() {
  nameInput.value = nameAvatar.textContent;
  aboutMeInput.value = aboutMeAvatar.textContent;
  openPopup(popupEditProfile);
});

closeEditProfileButton.addEventListener('click', function() {
  closePopup(popupEditProfile);
});

popupEditProfile.addEventListener('click', handleOverlayClick);

//document.addEventListener('keydown', cloceEsc);

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
  
  closePopup(popupEditProfile);
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
//const cardTemplate = document.querySelector('#element-template');

openPopupAddCard.addEventListener('click', function() {
  inputCardName.value = '';
  inputCardPhto.value = '';
  openPopup(popupAddCard);
});

closePopupAddCard.addEventListener('click', function() {
  closePopup(popupAddCard);
});

popupAddCard.addEventListener('click', handleOverlayClick);

// создание новой карточки перенёс в class Card
/*
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
    openPopup(popupImage);
  });

  return newCard;
}
*/

// добавление карточки через initial-cards.js
initialCards.forEach(function(cardData) {
  const cards = new Card(cardData);
  const cardElement = cards.generateCard ();
  cardContainer.append(cardElement);
});

/*
// добавление карточки через initial-cards.js
initialCards.forEach(function(cardData) {
  const cards = createCard(cardData);
  cardContainer.append(cards);
});
*/

// добавление карточки через форму
function formAddCardSubmitHandler (event) {
  event.preventDefault();

  const cardElementFoto = {};
  
  cardElementFoto.name = inputCardName.value;
  cardElementFoto.link = inputCardPhto.value;
  inputCardName.value = '';
  inputCardPhto.value = '';
  
  // делает кнопку сабминта неактивной
  const inputList = Array.from(document.forms.card_form);
  const buttonElement = inputList.pop();
  const form = new FormValidator(inputList);
  form.toggleButtonState(inputList, buttonElement);

  /*const newCardForm = createCard(cardElementFoto);*/

  const cards = new Card(cardElementFoto);
  const cardElement = cards.generateCard ();

  cardContainer.prepend(cardElement);
  closePopup(popupAddCard);
}

formAddCard.addEventListener('submit', formAddCardSubmitHandler);

//popup картинок
const popupImage = document.querySelector('.popup_type_image');
const closePopupImage = popupImage.querySelector('.images-content__button');
const popupImageContent = popupImage.querySelector('.images-content__foto');
const popupImageTitle = popupImage.querySelector('.images-content__title');

closePopupImage.addEventListener('click', function() {
  closePopup(popupImage);
});

popupImage.addEventListener('click', handleOverlayClick);