import Card from '../components/Card.js';
import { initialCards, keyEscape, config, cardSelector, profileForm, cardForm } from '../utils/constants.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
export { openPopup, popupImage, popupImageContent, popupImageTitle };

const profileFormValidator = new FormValidator(config, profileForm);
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(config, cardForm);
cardFormValidator.enableValidation();

//popup изменения профиля
const openEditProfileButton = document.querySelector('.profile-info__button');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const closeEditProfileButton = document.querySelector('.popup__button_profile');

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

// изменения профиля
const nameAvatar = document.querySelector('.profile-info__title');
const aboutMeAvatar = document.querySelector('.profile-info__text');
const formEditProfile = document.querySelector('.form_profile');
const nameInput = formEditProfile.querySelector('.form__text_edit_name');
const aboutMeInput = formEditProfile.querySelector('.form__text_edit_about-me');


function handleEditProfileFormSubmit (event) {
  event.preventDefault();

  const userName = nameInput.value;
  const userProfession = aboutMeInput.value;

  nameAvatar.textContent = userName;
  aboutMeAvatar.textContent = userProfession;
  
  closePopup(popupEditProfile);
}

formEditProfile.addEventListener('submit', handleEditProfileFormSubmit);

// popup карточек  
const popupAddCard = document.querySelector('.popup_type_add-card');
const openPopupAddCard = document.querySelector('.profile__button');
const closePopupAddCard = document.querySelector('.popup__button_card')

const formAddCard = popupAddCard.querySelector('.form');
const inputCardName = popupAddCard.querySelector('.form__text_edit_name');
const inputCardPhto = popupAddCard.querySelector('.form__text_edit_about-me');
const cardContainer = document.querySelector('.elements');

openPopupAddCard.addEventListener('click', function() {
  formAddCard.reset();
  openPopup(popupAddCard);
});

closePopupAddCard.addEventListener('click', function() {
  closePopup(popupAddCard);
});

popupAddCard.addEventListener('click', handleOverlayClick);

// добавление карточки через initial-cards.js
// initialCards.forEach(function(cardData) {
//   const cards = new Card(cardData, cardSelector);
//   const cardElement = cards.generateCard ();
//   cardContainer.append(cardElement);
// });

// function rendererCsrds(cardData) {
//   const cards = new Card(cardData, cardSelector).generateCard();
//   //const cardElement = cards.generateCard();
// }

const addCards = new Section({ items: initialCards }, '.elements');
addCards.renderItems();

// добавление карточки через форму
function handleFormAddCardSubmit (event) {
  event.preventDefault();

  const cardElementFoto = {};
  
  cardElementFoto.name = inputCardName.value;
  cardElementFoto.link = inputCardPhto.value;
  inputCardName.value = '';
  inputCardPhto.value = '';
  
  // делает кнопку сабминта неактивной
  cardFormValidator.toggleButtonState();
  
  const cards = new Card(cardElementFoto, cardSelector);
  const cardElement = cards.generateCard ();

  cardContainer.prepend(cardElement);
  closePopup(popupAddCard);
}

formAddCard.addEventListener('submit', handleFormAddCardSubmit);

//popup картинок
const popupImage = document.querySelector('.popup_type_image');
const closePopupImage = popupImage.querySelector('.images-content__button');
const popupImageContent = popupImage.querySelector('.images-content__foto');
const popupImageTitle = popupImage.querySelector('.images-content__title');

closePopupImage.addEventListener('click', function() {
  closePopup(popupImage);
});

popupImage.addEventListener('click', handleOverlayClick);