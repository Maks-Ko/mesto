import './index.css';

import { initialCards, config, cardSelector, profileForm, cardForm } from '../utils/constants.js';
import { openEditProfileButton, popupEditProfile, dataUserInfo, formEditProfile, nameInput, aboutMeInput, nameAvatar, aboutMeAvatar } from '../utils/constants.js';
import { popupAddCard, openPopupAddCard, formAddCard, cardContainer, popupImage } from '../utils/constants.js';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

//export { openPopup };

// проверка на валидность полей редактирования профиля
const profileFormValidator = new FormValidator(config, profileForm);
profileFormValidator.enableValidation();

// проверка на валидность полей добавления крточки
const cardFormValidator = new FormValidator(config, cardForm);
cardFormValidator.enableValidation();

// экземпляр класса для попапа редактирования профиля
const userInfo = new UserInfo({ userName: nameAvatar, userProfession: aboutMeAvatar });

// экземпляр класса редактирования профиля
const popupUserForm = new PopupWithForm({
  popup: popupEditProfile,
  handleFormSubmit: () => {
    userInfo.setUserInfo();
    popupUserForm.close();
  }
});

// открытие попапа редактирования профиля
openEditProfileButton.addEventListener('click', function() {  
  const userInfoIput = userInfo.getUserInfo();
  
  nameInput.value = userInfoIput.name;
  aboutMeInput.value = userInfoIput.profession;

  popupUserForm.open();
});

// закрытие попапа редактирование профеля
popupUserForm.setEventListeners();

// экземпляр класса добавление карточек из массива данных 
const addCards = new Section({ items: initialCards, renderer: rendererCsrds }, '.elements');

// экземпляр класса открытие попапа с картинкой
const popupOpenImage = new PopupWithImage({ popup: popupImage });

// экземпляр класса создания карточки

function createCard (cardData) {
  const createCard = new Card(cardData, cardSelector, {
    handleCardClick: (name, link) => {
      popupOpenImage.open(name, link);
    }
  }).generateCard();
  return createCard;
}

// создание карточек из масива данных
function rendererCsrds(cardData) {  
  // const cards = new Card(cardData, cardSelector, {
  //   handleCardClick: (name, link) => {
  //     popupOpenImage.open(name, link);
  //   }
  // }).generateCard();
  const cards = createCard(cardData);
  addCards.addItem(cards);
}

addCards.renderItems();

// экземпляр класса добавление карточки через форму
const formCard = new PopupWithForm({
  popup: popupAddCard,
  handleFormSubmit: (cardData) => {
    // const cards = new Card(
    //   {
    //     name: image_name.value,
    //     link: url_image.value
    //   },
    //   cardSelector, {
    //   handleCardClick: (name, link) => {
    //     popupOpenImage.open(name, link);
    //   }
    // }).generateCard();
    const cards = createCard({
      name: image_name.value,
      link: url_image.value
    });
    formCard.close();
    addCards.addItem(cards);
  }
});

// открытие попапа добавления карточки
openPopupAddCard.addEventListener('click', function() {
  cardFormValidator.toggleButtonState();
  formCard.open();
});

// звкрытие попапа добавление карточки
formCard.setEventListeners();

// закрытие попапа кртинки
popupOpenImage.setEventListeners();