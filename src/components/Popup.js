import { keyEscape } from '../utils/constants.js';

export default class Popup {
    constructor({ popupSelector }) {
        this._popupSelector = popupSelector;
        this._handleEscClose = this._handleEscClose.bind(this);
        this._handleOverlayClick = this._handleOverlayClick.bind(this);
        //this.close = this.close.bind(this);
    }
    
    open() {
        this._popupSelector.classList.add('popup_is-opened');
        document.addEventListener('keydown', this._handleEscClose);
        this._popupSelector.addEventListener('click', this._handleOverlayClick);
    }

    close() {
        this._popupSelector.classList.remove('popup_is-opened');
        document.removeEventListener('keydown', this._handleEscClose);
        this._popupSelector.removeEventListener('click', this._handleOverlayClick);
    }

    // метод закрытия попапа нажатием на Esc
    _handleEscClose(evt) {
        if (evt.key === keyEscape) {
            this.close();
        }
    }

    // закрытия попапа кликом на оверлей
    _handleOverlayClick(evt) {
        if (evt.target === evt.currentTarget) {
            this.close();
        }
    }

    // метод добавления слушателей
    setEventListeners() {
        // закрытие попапа по крестику
        const closeButtom = this._popupSelector.querySelector('.popup__button-close');
        closeButtom.addEventListener('click', this.close.bind(this));
    }
}