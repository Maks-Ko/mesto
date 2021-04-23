const openPopupButten = document.querySelector('.profileInfo__button');
const popup = document.querySelector('.popup');
const closePopupButten = document.querySelector('.popup__button');
let nameAvatar = document.querySelector('.profileInfo__title');
let aboutMeAvatar = document.querySelector('.profileInfo__text'); 
let formElement = document.querySelector('.form');
let nameInput = formElement.querySelector('.form__text_edit_name');
let aboutMeInput = formElement.querySelector('.form__text_edit_about-me');

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