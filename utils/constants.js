export { initialCards, keyEscape, config, cardSelector, profileForm, cardForm };
export { openEditProfileButton, popupEditProfile, closeEditProfileButton, nameAvatar, aboutMeAvatar, formEditProfile, nameInput, aboutMeInput};
export { popupAddCard, openPopupAddCard, closePopupAddCard, formAddCard, inputCardName, inputCardPhto, cardContainer, dataUserInfo};
export {popupImage, closePopupImage, popupImageContent, popupImageTitle};

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const keyEscape = 'Escape';

const profileForm = '#profileFormValidator';
const cardForm = '#cardFormValidator';

const config = {
  //formSelector: '.form',
  inputSelector: '.form__text',
  submitButtonSelector: '.form__button',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

const cardSelector = '#element-template';

//popup изменения профиля
const openEditProfileButton = document.querySelector('.profile-info__button');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const closeEditProfileButton = document.querySelector('.popup__button_profile');

// изменения профиля
const nameAvatar = document.querySelector('.profile-info__title');
const aboutMeAvatar = document.querySelector('.profile-info__text');
const formEditProfile = document.querySelector('.form_profile');
const nameInput = formEditProfile.querySelector('.form__text_edit_name');
const aboutMeInput = formEditProfile.querySelector('.form__text_edit_about-me');
const dataUserInfo = {};
dataUserInfo.name = nameAvatar;
dataUserInfo.profession = aboutMeAvatar;

// popup карточек  
const popupAddCard = document.querySelector('.popup_type_add-card');
const openPopupAddCard = document.querySelector('.profile__button');
const closePopupAddCard = document.querySelector('.popup__button_card')

const formAddCard = popupAddCard.querySelector('.form');
const inputCardName = popupAddCard.querySelector('.form__text_edit_name');
const inputCardPhto = popupAddCard.querySelector('.form__text_edit_about-me');
const cardContainer = document.querySelector('.elements');

//popup картинок
const popupImage = document.querySelector('.popup_type_image');
const closePopupImage = popupImage.querySelector('.images-content__button');
const popupImageContent = popupImage.querySelector('.images-content__foto');
const popupImageTitle = popupImage.querySelector('.images-content__title');