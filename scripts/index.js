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


let nameAvatar = document.querySelector('.profile-info__title');
let aboutMeAvatar = document.querySelector('.profile-info__text'); 
let formElement = document.querySelector('.form');
let nameInput = formElement.querySelector('.form__text_edit_name');
let aboutMeInput = formElement.querySelector('.form__text_edit_about-me');
// Находим форму в DOM
//let formElement = document.querySelector('.form');  // Воспользуйтесь методом querySelector()

// Находим поля формы в DOM
//let nameInput = formElement.querySelector('.form__text_edit_name');    // Воспользуйтесь инструментом .querySelector()
//let aboutMeInput = formElement.querySelector('.form__text_edit_about-me'); // Воспользуйтесь инструментом .querySelector()

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

  const elementFoto = document.querySelector('.elements');

  initialCards.forEach(function(element) {
    const cardTemplate = document.querySelector('#element-template').content;
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);

    cardElement.querySelector('.element__title').textContent = element.name;
    cardElement.querySelector('.element__foto').src = element.link;
    cardElement.querySelector('.element__foto').alt = element.name;
    
    elementFoto.append(cardElement);
  });

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

// add cards

let formMesto = popupMesto.querySelector('.form');
let inputNameMesto = formMesto.querySelector('.form__text_edit_name');
let inputFotoMesto = formMesto.querySelector('.form__text_edit_about-me');

function formSubmitHandlerMesto (event) {
    event.preventDefault();

    let inputNameMestoV = inputNameMesto.value;
    let inputFotoMestoV = inputFotoMesto.value;

    const cardTemplate = document.querySelector('#element-template').content;
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);

    cardElement.querySelector('.element__title').textContent = inputNameMestoV;
    cardElement.querySelector('.element__foto').src = inputFotoMestoV;
    cardElement.querySelector('.element__foto').alt = inputNameMestoV;
    
    elementFoto.prepend(cardElement);

    togglePopupMesto(event);
}

formMesto.addEventListener('submit', formSubmitHandlerMesto);