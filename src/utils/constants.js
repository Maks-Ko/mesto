const keyEscape = 'Escape';

const profileForm = '#profileFormValidator';
const cardForm = '#cardFormValidator';
const avatarForm = '#avatarFormValidator';

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
const avatar = document.querySelector('.profile__avatar');
const avatarActiv = document.querySelector('.profile__avatar-activ');
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

// popup удаления карточки
const popupDeleteCard = document.querySelector('.popup_type_delete-card');

// popup редактирования аватар
const popupEditAvatar = document.querySelector('.popup_type_edit-avatar');
const linkAvatar = popupEditAvatar.querySelector('.form__text_edit_about-me');

export { keyEscape, config, cardSelector, profileForm, cardForm };
export { openEditProfileButton, popupEditProfile, closeEditProfileButton, nameAvatar, aboutMeAvatar, avatar, avatarActiv, formEditProfile, nameInput, aboutMeInput};
export { popupAddCard, openPopupAddCard, closePopupAddCard, formAddCard, inputCardName, inputCardPhto, cardContainer, dataUserInfo, popupDeleteCard};
export {popupImage, closePopupImage, popupImageContent, popupImageTitle, popupEditAvatar, avatarForm, linkAvatar };