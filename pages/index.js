import { initialCards, keyEscape, config, cardSelector, profileForm, cardForm } from '../utils/constants.js';
import { openEditProfileButton, popupEditProfile, closeEditProfileButton, nameAvatar, aboutMeAvatar, formEditProfile, nameInput, aboutMeInput} from '../utils/constants.js';
import { popupAddCard, openPopupAddCard, closePopupAddCard, formAddCard, inputCardName, inputCardPhto, cardContainer} from '../utils/constants.js';
import {popupImage, closePopupImage } from '../utils/constants.js';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';

//export { openPopup };

// проверка на валидность полей редактирования профиля
const profileFormValidator = new FormValidator(config, profileForm);
profileFormValidator.enableValidation();

// проверка на валидность полей добавления крточки
const cardFormValidator = new FormValidator(config, cardForm);
cardFormValidator.enableValidation();

// // функция открытия попапа
// function openPopup(popup) {
//   popup.classList.add('popup_is-opened');
//   //document.addEventListener('keydown', cloceEsc);
// }

// // функция закрытия попапа
// function closePopup(popup) {
//   popup.classList.remove('popup_is-opened');
//   //document.removeEventListener('keydown', cloceEsc);
// }

// // функция закрытия попапа кликом на оверлей
// function handleOverlayClick(event) {
//   const openPopup = document.querySelector('.popup_is-opened');
//   if (event.target === event.currentTarget) {    
//     closePopup(openPopup);
//   }
// }

// функция закрытия попапа нажатием на Esc
// function cloceEsc(evt) {
//   const openPopup = document.querySelector('.popup_is-opened');
//   if (evt.key === keyEscape) {
//     closePopup(openPopup);
//   }
// }

const popupFormProfil = new Popup({ popupSelector: popupEditProfile });

// открытие попапа редактирования профиля
openEditProfileButton.addEventListener('click', function() {
  nameInput.value = nameAvatar.textContent;
  aboutMeInput.value = aboutMeAvatar.textContent;
  popupFormProfil.open();
});

// // закрытие попапа редактирования профиля
// closeEditProfileButton.addEventListener('click', function() {
//   popupFormProfil.close();
// });

// закрытие попапа редактирование профеля по слушателям
popupFormProfil.setEventListeners();
//popupEditProfile.addEventListener('click', handleOverlayClick);




function handleEditProfileFormSubmit (event) {
  event.preventDefault();

  const userName = nameInput.value;
  const userProfession = aboutMeInput.value;

  nameAvatar.textContent = userName;
  aboutMeAvatar.textContent = userProfession;
  
  popupFormProfil.close();
  //closePopup(popupEditProfile);
}

formEditProfile.addEventListener('submit', handleEditProfileFormSubmit);


// openPopupAddCard.addEventListener('click', function() {
//   formAddCard.reset();
//   openPopup(popupAddCard);
// });

// closePopupAddCard.addEventListener('click', function() {
//   closePopup(popupAddCard);
// });

const popupFormCard = new Popup({ popupSelector: popupAddCard });

// открытие попапа добавления карточки
openPopupAddCard.addEventListener('click', function() {
  formAddCard.reset();
  popupFormCard.open();
});

// // закрытие попапа добавления карточки
// closePopupAddCard.addEventListener('click', function() {
//   popupFormCard.close();
// });

// закрытие попапа добаления карточки по слушателям
popupFormCard.setEventListeners();
//popupAddCard.addEventListener('click', handleOverlayClick);

// добавление карточки через initial-cards.js
// initialCards.forEach(function(cardData) {
//   const cards = new Card(cardData, cardSelector);
//   const cardElement = cards.generateCard ();
//   cardContainer.append(cardElement);
// });


// добавление карточек из массива данных 
const addCards = new Section({ items: initialCards, renderer: rendererCsrds }, '.elements');

function rendererCsrds(cardData) {
  const cards = new Card(cardData, cardSelector).generateCard();
  addCards.addItem(cards);
}

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
  popupFormCard.close();
  //closePopup(popupAddCard);
}

formAddCard.addEventListener('submit', handleFormAddCardSubmit);

// открытие попапа с картинкой
const popupOpenImage = new PopupWithImage({ popupSelector: popupImage });
export const handleOpenImage = (name, link) => {
  popupOpenImage.open(name, link);
  console.log("foto");
}

// // закрытие попапа кртинки по слушателям
popupOpenImage.setEventListeners();

//popupImage.addEventListener('click', handleOverlayClick);
