import './index.css';

import { initialCards, config, cardSelector, profileForm, cardForm } from '../utils/constants.js';
import { openEditProfileButton, popupEditProfile, nameInput, aboutMeInput, nameAvatar, aboutMeAvatar } from '../utils/constants.js';
import { popupAddCard, openPopupAddCard, popupImage } from '../utils/constants.js';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

const apiUser = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-26/users/me',
  headers: {
    authorization: 'd3e97d43-b7f6-462d-a435-bd7e94d9d5b6'
  }
});

apiUser.getUserInfoApi()
.then((data) => {
  const nameAv = document.querySelector('.profile-info__title');
  const aboutMe = document.querySelector('.profile-info__text');
  const avatar = document.querySelector('.profile__avatar');
  nameAv.textContent = data.name;
  aboutMe.textContent = data.about;
  avatar.src = data.avatar;
  
  console.log(data);
})
.catch((err) => {
  console.log(err); // "Что-то пошло не так: ..."
});


// fetch('https://mesto.nomoreparties.co/v1/cohort-26/users/me', {
//   headers: {
//     authorization: 'd3e97d43-b7f6-462d-a435-bd7e94d9d5b6'
//   }
// })
//   .then((res) => {
//     return res.json();
//   })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log('Ошибка. Запрос не выполнен: ', err);
//   });


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
    userInfo.setUserInfo({
      userNameInput:  nameInput.value,
      userProfessionInput: aboutMeInput.value
    });
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
  const cards = createCard(cardData);
  addCards.addItem(cards);
}

addCards.renderItems();

// экземпляр класса добавление карточки через форму
const formCard = new PopupWithForm({
  popup: popupAddCard,
  handleFormSubmit: () => {
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