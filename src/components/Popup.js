import { keyEscape } from '../utils/constants.js';

export default class Popup {
    constructor({ popup }) {
        this._popup = popup;
        this._handleEscClose = this._handleEscClose.bind(this);
        this._handleOverlayClick = this._handleOverlayClick.bind(this);
    }
    
    open() {
        this._popup.classList.add('popup_is-opened');
        document.addEventListener('keydown', this._handleEscClose);
        this._popup.addEventListener('click', this._handleOverlayClick);
    }

    close() {
        this._popup.classList.remove('popup_is-opened');
        document.removeEventListener('keydown', this._handleEscClose);
        this._popup.removeEventListener('click', this._handleOverlayClick);
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
        const closeButtom = this._popup.querySelector('.popup__button-close');
        closeButtom.addEventListener('click', this.close.bind(this));
    }
}