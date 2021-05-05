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

function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
        toggleEditProfile(event);
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

function handleOverlayClickMesto(event) {
    if (event.target === event.currentTarget) {
        togglePopupAddCard(event);
    }
}

popupAddCard.addEventListener('click', handleOverlayClickMesto);

//cards
const formMesto = popupAddCard.querySelector('.form');
const inputCardMesto = popupAddCard.querySelector('.form__text_edit_name');
const inputCardPhto = popupAddCard.querySelector('.form__text_edit_about-me');
const cardContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#element-template');

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

function createCard (card) {
  const newCard = cardTemplate.content.querySelector('.element').cloneNode(true);
  const likeButton = newCard.querySelector('.element__like');
  const cardDeleteButton = newCard.querySelector('.element__delete');
   
  newCard.querySelector('.element__title').textContent = card.name;
  newCard.querySelector('.element__foto').src = card.link;
  newCard.querySelector('.element__foto').alt = card.name;

  likeButton.addEventListener('click', function(like) {
    like.target.closest('.element__like').classList.toggle('element__like_active');
  });

  cardDeleteButton.addEventListener('click', function(del) {
    del.target.closest('.element').remove();
  });

  return newCard;
}

initialCards.forEach(function(cards) {
  const newCards = createCard(cards);
  cardContainer.append(newCards);
});

// add card 
function formAddCardSubmitHandler (event) {
  event.preventDefault();
  
  const cardTitle = inputCardMesto.value;
  const cardLink = inputCardPhto.value;
  const arrayInput = [
    {
      name: `${cardTitle}`,
      link: `${cardLink}`
    }
  ];
  
  arrayInput.forEach(function(cards) {
    const newCardForm = createCard(cards);
    cardContainer.prepend(newCardForm);
  });

  togglePopupAddCard(event);
}

formMesto.addEventListener('submit', formAddCardSubmitHandler);

//popup images
const popupImage = document.querySelector('.popup_for_image');
const openPopupImage = document.querySelectorAll('.element__foto');
const closePopupImage = popupImage.querySelector('.images-content__button');

const popupImageContent = popupImage.querySelector('.images-content__foto');
const popupImageTitle = popupImage.querySelector('.images-content__title');

function togglePopupImage() {
  popupImage.classList.toggle('popup_is-opened');
}

openPopupImage.forEach(function (images) {
  images.addEventListener('click', function() {
    popupImageContent.src = images.src;
    popupImageTitle.textContent = images.alt;
    togglePopupImage();
  });
})

closePopupImage.addEventListener('click', togglePopupImage);

function handleOverlayClickImage(event) {
  if (event.target === event.currentTarget) {
    togglePopupImage(event);
  }
}

popupImage.addEventListener('click', handleOverlayClickImage);