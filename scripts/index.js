const openPopupButten = document.querySelector('.profileInfo__button');
const popup = document.querySelector('.popup');
const closePopupButten = document.querySelector('.popup__button');

function togglePopup(event) {
    event.preventDefault();
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