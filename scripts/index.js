//popup изменения профиля
const openEditProfileButton = document.querySelector('.profile-info__button');
const popupEditProfile = document.querySelector('.popup_for_profile');
const closeEditProfileButton = document.querySelector('.popup__button');

function toggleEditProfile(event) {
    event.preventDefault();
    popupEditProfile.classList.toggle('popup_is-opened');
}

openEditProfileButton.addEventListener('click', toggleEditProfile);
closeEditProfileButton.addEventListener('click', toggleEditProfile);

function handleOverlayClick(event) {
  const classNameEditProfile = 'popup popup_for_profile popup_is-opened';
  const classNamepopupAddCard = 'popup popup_mesto popup_is-opened';
  const classNamePopupImage = 'popup popup_for_image popup_is-opened';

  if (event.target === event.currentTarget && popupEditProfile.className === classNameEditProfile) {
    console.log(popupEditProfile.className);
    toggleEditProfile(event);
  }
  
  else if (event.target === event.currentTarget && popupAddCard.className === classNamepopupAddCard) {
    togglePopupAddCard(event);
  }

  else if (event.target === event.currentTarget && popupImage.className === classNamePopupImage) {
    togglePopupImage(event);
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
  
  toggleEditProfile(event);
}

formEditProfile.addEventListener('submit', formEditProfileSubmitHandler);

// popup mesto  
const popupAddCard = document.querySelector('.popup_mesto');
const openPopupAddCard = document.querySelector('.profile__button');
const closePopupAddCard = document.querySelector('.popup__button_mesto')

function togglePopupAddCard(event) {
    event.preventDefault();
    popupAddCard.classList.toggle('popup_is-opened');

}

openPopupAddCard.addEventListener('click', togglePopupAddCard);
closePopupAddCard.addEventListener('click', togglePopupAddCard);
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
    togglePopupImage();
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
  togglePopupAddCard(event);
}

formAddCard.addEventListener('submit', formAddCardSubmitHandler);

//popup картинок
const popupImage = document.querySelector('.popup_for_image');
const closePopupImage = popupImage.querySelector('.images-content__button');
const popupImageContent = popupImage.querySelector('.images-content__foto');
const popupImageTitle = popupImage.querySelector('.images-content__title');

function togglePopupImage() {
  popupImage.classList.toggle('popup_is-opened');
}

closePopupImage.addEventListener('click', togglePopupImage);
popupImage.addEventListener('click', handleOverlayClick);