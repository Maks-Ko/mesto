const openPopupButten = document.querySelector('.profile-info__button');
const popup = document.querySelector('.popup');
const closePopupButten = document.querySelector('.popup__button');

function togglePopup(event) {
    event.preventDefault();
    nameInput.value = nameAvatar.textContent;
    aboutMeInput.value = aboutMeAvatar.textContent;
    popup.classList.toggle('popup_is-opened');
}

openPopupButten.addEventListener('click', togglePopup);
closePopupButten.addEventListener('click', togglePopup);

function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
        togglePopup(event);
    }
}

popup.addEventListener('click', handleOverlayClick);

// Находим форму в DOM
// Воспользуйтесь методом querySelector()

// Находим поля формы в DOM
// Воспользуйтесь инструментом .querySelector()
// Воспользуйтесь инструментом .querySelector()
let nameAvatar = document.querySelector('.profile-info__title');
let aboutMeAvatar = document.querySelector('.profile-info__text');
let formElement = document.querySelector('.form');
let nameInput = formElement.querySelector('.form__text_edit_name');
let aboutMeInput = formElement.querySelector('.form__text_edit_about-me');


// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function formSubmitHandler (event) {
    event.preventDefault();   // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.
    let nameInputV = nameInput.value;
    let aboutMeInputV = aboutMeInput.value;    // Получите значение полей jobInput и nameInput из свойства value

    //let nameAvatar = document.querySelector('.profileInfo__title');
    //let aboutMeAvatar = document.querySelector('.profileInfo__text');   // Выберите элементы, куда должны быть вставлены значения полей

    nameAvatar.textContent = nameInputV;
    aboutMeAvatar.textContent = aboutMeInputV; // Вставьте новые значения с помощью textContent

    togglePopup(event);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

//const closeForm = formElement.querySelector('.form__button');
//formElement.addEventListener('submit', togglePopup);


// popup mesto  
const popupMesto = document.querySelector('.popup_mesto');
const openPopupMesto = document.querySelector('.profile__button');
const closePopupMesto = document.querySelector('.popup__button_mesto')

function togglePopupMesto(event) {
    event.preventDefault();
    popupMesto.classList.toggle('popup_is-opened');

}
openPopupMesto.addEventListener('click', togglePopupMesto);
closePopupMesto.addEventListener('click', togglePopupMesto);

function handleOverlayClickMesto(event) {
    if (event.target === event.currentTarget) {
        togglePopupMesto(event);
    }
}

popupMesto.addEventListener('click', handleOverlayClickMesto);



//cards
const formMesto = popupMesto.querySelector('.form');
const inputCardMesto = popupMesto.querySelector('.form__text_edit_name');
const inputCardPhto = popupMesto.querySelector('.form__text_edit_about-me');
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

function card (card) {
  const newCard = cardTemplate.content.querySelector('.element').cloneNode(true);
  const likeButten = newCard.querySelector('.element__like');
  const cardDeleteButten = newCard.querySelector('.element__delete');  
 
  newCard.querySelector('.element__title').textContent = card.name;
  newCard.querySelector('.element__foto').src = card.link;
  newCard.querySelector('.element__foto').alt = card.name;

  likeButten.addEventListener('click', function(like) {
    like.target.closest('.element__like').classList.toggle('element__like_active');
  });

  cardDeleteButten.addEventListener('click', function(del) {
    del.target.closest('.element').remove();
  });

  return newCard;
}

initialCards.forEach(function(cards) {
  const newCards = card(cards);
  cardContainer.append(newCards);
});

// add card 
function formSubmitHandlerMesto (event) {
  event.preventDefault();
  
  const inputCardMestoV = inputCardMesto.value;
  const inputCardPhtoV = inputCardPhto.value;
  const arrayInput = [
    {
      name: `${inputCardMestoV}`,
      link: `${inputCardPhtoV}`
    }
  ];
  
  arrayInput.forEach(function(cards) {
    const newCardForm = card(cards);
    cardContainer.prepend(newCardForm);
  });

  togglePopupMesto(event);
}

formMesto.addEventListener('submit', formSubmitHandlerMesto);