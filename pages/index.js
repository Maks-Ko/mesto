import { initialCards, config, cardSelector, profileForm, cardForm } from '../utils/constants.js';
import { openEditProfileButton, popupEditProfile, dataUserInfo, formEditProfile, nameInput, aboutMeInput} from '../utils/constants.js';
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

const userInfo = new UserInfo({ data: dataUserInfo });

const popupFormProfil = new Popup({ popupSelector: popupEditProfile });

// открытие попапа редактирования профиля
openEditProfileButton.addEventListener('click', function() {  
  const userInfoIput = userInfo.getUserInfo();
  
  nameInput.value = userInfoIput.name;
  aboutMeInput.value = userInfoIput.profession;

  popupFormProfil.open();
});

// закрытие попапа редактирование профеля 
popupFormProfil.close();
popupFormProfil.setEventListeners();

function handleEditProfileFormSubmit (event) {
  event.preventDefault();

  userInfo.setUserInfo();
  
  popupFormProfil.close();
}

formEditProfile.addEventListener('submit', handleEditProfileFormSubmit);

// добавление карточек из массива данных 
const addCards = new Section({ items: initialCards, renderer: rendererCsrds }, '.elements');

function rendererCsrds(cardData) {
  const cards = new Card(cardData, cardSelector).generateCard();
  addCards.addItem(cards);
}

addCards.renderItems();

// открытие попапа добавления карточки
const popupFormCard = new Popup({ popupSelector: popupAddCard });

openPopupAddCard.addEventListener('click', function() {
  formAddCard.reset();
  cardFormValidator.toggleButtonState();
  popupFormCard.open();
});

// закрытие попапа добаления карточки
popupFormCard.close();

// закрытие попапа добавление карточки по сабмиту
const formCard = new PopupWithForm({
  popupSelector: popupAddCard,
  handleFormSubmit: (FormData) => {
    const cards = new Card(FormData, cardSelector);
    const cardElement = cards.generateCard ();
    cardContainer.prepend(cardElement);
  }
});

formCard.setEventListeners();


// открытие попапа с картинкой
const popupOpenImage = new PopupWithImage({ popupSelector: popupImage });
export const handleOpenImage = (name, link) => {
  popupOpenImage.open(name, link);
}

// закрытие попапа кртинки
popupOpenImage.close();
popupOpenImage.setEventListeners();