import './index.css';

import { config, cardSelector, profileForm, cardForm } from '../utils/constants.js';
import { openEditProfileButton, popupEditProfile, nameInput, aboutMeInput, nameAvatar, aboutMeAvatar, avatar } from '../utils/constants.js';
import { popupAddCard, openPopupAddCard, popupImage, popupDeleteCard } from '../utils/constants.js';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithDeleteCard from '../components/PopupWithDeleteCard.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-26',
  headers: {
    authorization: 'd3e97d43-b7f6-462d-a435-bd7e94d9d5b6'
  }
});

// добавить первоначальные данные
api.getAllNeededData()
.then((date) => {
  const [ dateFormUser, dateCards] = date;

  nameAvatar.textContent = dateFormUser.name;
  aboutMeAvatar.textContent = dateFormUser.about;
  avatar.src = dateFormUser.avatar;
  
  console.log(dateCards);
  addCards.renderItems(dateCards);
})
.catch((err) => {
  console.log(err); // "Что-то пошло не так: ..."
});



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
    // редактирование профиля на сервере
    const apiEditForm = new Api({
      baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-26',
      headers: {
        authorization: 'd3e97d43-b7f6-462d-a435-bd7e94d9d5b6',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: nameInput.value,
        about: aboutMeInput.value
      })
    });
    apiEditForm.editProfile()
    .then((data) => {
      userInfo.setUserInfo({
        userNameInput:  data.name,
        userProfessionInput: data.about
      });
    })
    .catch((err) => {
      console.log(err); // "Что-то пошло не так: ..."
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
const addCards = new Section({ renderer: rendererCsrds }, '.elements');

// экземпляр класса открытие попапа с картинкой
const popupOpenImage = new PopupWithImage({ popup: popupImage });
let idCardDel = null;
// экземпляр класса удаления карточки
const popupOpenDeleteCard = new PopupWithDeleteCard({
  popup: popupDeleteCard,
  handleFormSubmit: () => {
    console.log(idCardDel);
    const apiDeleteCard = new Api({
      baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-26',
      idCard: idCardDel
    });
    apiDeleteCard.deleteCardUser()
    .then(() => {      
    })
    .catch((err) => {
      console.log(err); // "Что-то пошло не так: ..."
    });
    popupOpenDeleteCard.close();
  }
});

// закрытие попапа удаления карточки
popupOpenDeleteCard.setEventListeners();
// popupOpenDeleteCard.setSubmitAction();


// экземпляр класса создания карточки
function createCard (cardData) {
  const createCard = new Card(cardData, cardSelector, {
    handleCardClick: (name, link) => {
      popupOpenImage.open(name, link);
    },
    handleCardClickdelete: () => {
      popupOpenDeleteCard.open();
    },
    handleDeleteClick: (idCard) => {
      idCardDel = idCard;
      popupOpenDeleteCard.setSubmitAction();
    }
  }).generateCard();
  return createCard;
}


// создание карточек из масива данных
function rendererCsrds(cardData) {
  const cards = createCard(cardData);
  addCards.addItem(cards);
}

//addCards.renderItems();


// экземпляр класса добавление карточки через форму
const formCard = new PopupWithForm({
  popup: popupAddCard,
  handleFormSubmit: () => {
    const apiAddCard = new Api({
      baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-26',
      headers: {
        authorization: 'd3e97d43-b7f6-462d-a435-bd7e94d9d5b6',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: image_name.value,
        link: url_image.value
      })
    });
    apiAddCard.addCardForm()
    .then((data) => {
      const cards = createCard(data);
      addCards.addItem(cards);
    })
    .catch((err) => {
      console.log(err); // "Что-то пошло не так: ..."
    });
    formCard.close();
  }
});

// открытие попапа добавления карточки
openPopupAddCard.addEventListener('click', function() {
  cardFormValidator.toggleButtonState();
  formCard.open();
});

// звкрытие попапа добавление карточки
formCard.setEventListeners();

// закрытие попапа картинки
popupOpenImage.setEventListeners();