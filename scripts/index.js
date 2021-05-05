//popup изменения профиля
const openEditProfileButton = document.querySelector('.profile-info__button');
const popupEditProfile = document.querySelector('.popup_for_profile');
const closeEditProfileButton = document.querySelector('.popup__button');

function toggleEditProfile(event) {
    event.preventDefault();
    nameInput.value = nameAvatar.textContent;
    aboutMeInput.value = aboutMeAvatar.textContent;
    popupEditProfile.classList.toggle('popup_is-opened');
}

openEditProfileButton.addEventListener('click', toggleEditProfile);
closeEditProfileButton.addEventListener('click', toggleEditProfile);
/*
function handleOverlayClick(event) {
  
  if (event.target === event.currentTarget) {
    toggleEditProfile(event);
  }
  
  else if (event.target === event.currentTarget) {
    console.log(event.target);
    console.log(popupAddCard);
    togglePopupAddCard(event);
  }

  else if (event.target === event.currentTarget) {
    console.log(popupImage);
    togglePopupImage(event);
  }

}

popupEditProfile.addEventListener('click', handleOverlayClick);
*/
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

/*
function handleOverlayClickMesto(event) {
    if (event.target === event.currentTarget) {
        togglePopupAddCard(event);
    }
}

popupAddCard.addEventListener('click', handleOverlayClick);
*/
//cards
const formAddCard = popupAddCard.querySelector('.form');
const inputCardMesto = popupAddCard.querySelector('.form__text_edit_name');
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
  
  cardElementFoto.name = inputCardMesto.value;
  cardElementFoto.link = inputCardPhto.value;

  const newCardForm = createCard(cardElementFoto);

  cardContainer.prepend(newCardForm);
  togglePopupAddCard(event);
}

formAddCard.addEventListener('submit', formAddCardSubmitHandler);

//popup каринок
const popupImage = document.querySelector('.popup_for_image');
const closePopupImage = popupImage.querySelector('.images-content__button');
const popupImageContent = popupImage.querySelector('.images-content__foto');
const popupImageTitle = popupImage.querySelector('.images-content__title');

function togglePopupImage() {
  popupImage.classList.toggle('popup_is-opened');
}

closePopupImage.addEventListener('click', togglePopupImage);
/*
function handleOverlayClickImage(event) {
  if (event.target === event.currentTarget) {
    togglePopupImage(event);
  }
}

popupImage.addEventListener('click', handleOverlayClick);
*/