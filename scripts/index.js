//popup изменения профиля
const openEditProfileButton = document.querySelector('.profile-info__button');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const closeEditProfileButton = document.querySelector('.popup__button');

function togglePopup(event) {
    event.classList.toggle('popup_is-opened');
}

openEditProfileButton.addEventListener('click', function() {
  togglePopup(popupEditProfile);
});
closeEditProfileButton.addEventListener('click', function() {
  togglePopup(popupEditProfile);
});

function handleOverlayClick(event) {
  const classNameEditProfile = 'popup popup_type_edit-profile popup_is-opened';
  const classNamepopupAddCard = 'popup popup_type_add-card popup_is-opened';
  const classNamePopupImage = 'popup popup_type_image popup_is-opened';

  if (event.target === event.currentTarget && popupEditProfile.className === classNameEditProfile) {
    togglePopup(popupEditProfile);
  }
  
  else if (event.target === event.currentTarget && popupAddCard.className === classNamepopupAddCard) {
    togglePopup(popupAddCard);
  }

  else if (event.target === event.currentTarget && popupImage.className === classNamePopupImage) {
    togglePopup(popupImage);
  }
}

popupEditProfile.addEventListener('click', handleOverlayClick);

const nameAvatar = document.querySelector('.profile-info__title');
const aboutMeAvatar = document.querySelector('.profile-info__text');
const formEditProfile = document.querySelector('.form');
const nameInput = formEditProfile.querySelector('.form__text_edit_name');
const aboutMeInput = formEditProfile.querySelector('.form__text_edit_about-me');

// функция изменения профиля
function formEditProfileSubmitHandler (event) {
  event.preventDefault();

  const userName = nameInput.value;
  const userProfession = aboutMeInput.value;

  nameAvatar.textContent = userName;
  aboutMeAvatar.textContent = userProfession;
  
  togglePopup(popupEditProfile);
}

formEditProfile.addEventListener('submit', formEditProfileSubmitHandler);

// popup mesto  
const popupAddCard = document.querySelector('.popup_type_add-card');
const openPopupAddCard = document.querySelector('.profile__button');
const closePopupAddCard = document.querySelector('.popup__button_card')

openPopupAddCard.addEventListener('click', function() {
  togglePopup(popupAddCard);
});
closePopupAddCard.addEventListener('click', function() {
  togglePopup(popupAddCard);
});
popupAddCard.addEventListener('click', handleOverlayClick);

const formAddCard = popupAddCard.querySelector('.form');
const inputCardName = popupAddCard.querySelector('.form__text_edit_name');
const inputCardPhto = popupAddCard.querySelector('.form__text_edit_about-me');
const cardContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#element-template');

// создание новой карточки
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
    popupImageTitle.textContent = openPopupImage.alt;
    togglePopup(popupImage);
  });

  return newCard;
}

initialCards.forEach(function(cardData) {
  const newCards = createCard(cardData);
  cardContainer.append(newCards);
});

// добавление карточки через форму
function formAddCardSubmitHandler (event) {
  event.preventDefault();

  const cardElementFoto = {};  
  
  cardElementFoto.name = inputCardName.value;
  cardElementFoto.link = inputCardPhto.value;
  inputCardName.value = '';
  inputCardPhto.value = '';

  const newCardForm = createCard(cardElementFoto);

  cardContainer.prepend(newCardForm);
  togglePopup(popupAddCard);
}

formAddCard.addEventListener('submit', formAddCardSubmitHandler);

//popup картинок
const popupImage = document.querySelector('.popup_type_image');
const closePopupImage = popupImage.querySelector('.images-content__button');
const popupImageContent = popupImage.querySelector('.images-content__foto');
const popupImageTitle = popupImage.querySelector('.images-content__title');

closePopupImage.addEventListener('click', function() {
  togglePopup(popupImage);
});
popupImage.addEventListener('click', handleOverlayClick);