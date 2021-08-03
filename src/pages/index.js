import './index.css';

import { config, cardSelector, profileForm, cardForm } from '../utils/constants.js';
import { openEditProfileButton, popupEditProfile, nameInput, aboutMeInput, nameAvatar, aboutMeAvatar, avatar, avatarActiv } from '../utils/constants.js';
import { popupAddCard, openPopupAddCard, popupImage, popupDeleteCard, popupEditAvatar, avatarForm, linkAvatar } from '../utils/constants.js';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithDeleteCard from '../components/PopupWithDeleteCard.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

let userId = '';

// экземпляр класса добавление карточек
const addCards = new Section({ renderer: rendererCsrds }, '.elements');

// экземпляр класса создания карточки
function createCard (cardData) {
  const createCard = new Card(cardData, cardSelector, {
    userId: userId,
    handlePopupImageCard: (name, link) => {
      popupOpenImage.open(name, link);
    },
    handleDeleteCard: (cardInstance) => {
      cardDelete(cardInstance);
    },
    handleleLikeCard: (cardInstance) => {
      likeCard(cardInstance);
    },
  }).generateCard();
  return createCard;
}

// создание карточек из масива данных
function rendererCsrds(cardData) {
  const cards = createCard(cardData);
  addCards.addItem(cards);
}

// экземпляр класса добавление карточки через форму
const formCard = new PopupWithForm({
  popup: popupAddCard,
  handleFormSubmit: (data) => {
    addCardForm(data);
  }
});

// открытие попапа добавления карточки
openPopupAddCard.addEventListener('click', function() {
  cardFormValidator.toggleButtonState();
  formCard.open();
});

// звкрытие попапа добавление карточки
formCard.setEventListeners();

// экземпляр класса удаления карточки
const popupOpenDeleteCard = new PopupWithDeleteCard({ popup: popupDeleteCard });

// закрытие попапа удаления карточки
popupOpenDeleteCard.setEventListeners();

// экземпляр класса открытие попапа с картинкой
const popupOpenImage = new PopupWithImage({ popup: popupImage });

// закрытие попапа картинки
popupOpenImage.setEventListeners();

// экземпляр класса профиля
const userInfo = new UserInfo({ userName: nameAvatar, userProfession: aboutMeAvatar, userAvatar: avatar });

// экземпляр класса редактирования профиля через форму
const popupUserForm = new PopupWithForm({
  popup: popupEditProfile,
  handleFormSubmit: (data) => {
    editProfile(data);
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

// экземпляр класса попапа редактирования аватар
const popupAvatar = new PopupWithForm({
  popup: popupEditAvatar,
  handleFormSubmit: (data) => {
    editAvatar(data);
  }
});

// открытие попапа редактирования аватвр
avatarActiv.addEventListener('click', function() {
  avatarFormValidator.toggleButtonState();
  popupAvatar.open();
});
// закрытие попапа редактирования аватар
popupAvatar.setEventListeners();

// запросы на сервер
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-26',
  headers: {
    authorization: 'd3e97d43-b7f6-462d-a435-bd7e94d9d5b6',
    'Content-Type': 'application/json'
  },
});

// добавить первоначальные данные
api.getAllNeededData()
.then((date) => {
  const [ dateFormUser, dateCards] = date;
  userId = dateFormUser._id;
  
  userInfo.setUserInfo(dateFormUser);
  addCards.renderItems(dateCards);
})
.catch((err) => {
  console.log(err); // "Что-то пошло не так: ..."
});

// функция добавления катрочик через сервер
function addCardForm(dataCard) {
  formCard.renderLoading({ isLoading: true });
    api.addCardForm(dataCard)
    .then((data) => {
      const cards = createCard(data);
      addCards.addItem(cards);      
      formCard.close();
    })
    .catch((err) => {
      console.log(err); // "Что-то пошло не так: ..."
    })
    .finally(() => {
      formCard.renderLoading({ isLoading: false });
    });
  }

// функция редактирования профиля через сервер
function editProfile(dataUser) {
  popupUserForm.renderLoading({ isLoading: true });
    api.editProfile(dataUser)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupUserForm.close();
    })
    .catch((err) => {
      console.log(err); // "Что-то пошло не так: ..."
    })
    .finally(() => {
      popupUserForm.renderLoading({ isLoading: false });
    });
}

// функция изменеия аватар через сервер
function editAvatar(dataAvatar) {
  popupAvatar.renderLoading({isLoading: true});
    api.editAvatar(dataAvatar)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupAvatar.close();
    })
    .catch((err) => {
      console.log(err); // "Что-то пошло не так: ..."
    })
    .finally(() => {
      popupAvatar.renderLoading({ isLoading: false });      
    });

}

// функция удаления карточки через сервер
function cardDelete(cardInstance) {
  popupOpenDeleteCard.setSubmitAction(() => {
    api.deleteCardUser(cardInstance.idCard)
    .then(() => {
      cardInstance.cardDelete();
      popupOpenDeleteCard.close();
    })
    .catch((err) => {
      console.log(err); // "Что-то пошло не так: ..."
    });
  });
  popupOpenDeleteCard.open();
}

// функция лайка карточки через сервер
function likeCard(cardInstance) {
  cardInstance.isLikes();
  api.toggleLikeCard(cardInstance.idCard, cardInstance.isLike)
  .then((data) => {
    cardInstance.isLikeButton(data);
  })
  .catch((err) => {
    console.log(err); // "Что-то пошло не так: ..."
  })
}

// проверка на валидность полей редактирования профиля
const profileFormValidator = new FormValidator(config, profileForm);
profileFormValidator.enableValidation();

// проверка на валидность полей добавления крточки
const cardFormValidator = new FormValidator(config, cardForm);
cardFormValidator.enableValidation();

// проверка на валидность поля редактирования аватар
const avatarFormValidator = new FormValidator(config, avatarForm);
avatarFormValidator.enableValidation();