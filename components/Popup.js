import { keyEscape } from '../utils/constants.js';

export default class Popup {
    constructor({ popupSelector }) {
        this._popupSelector = popupSelector;
    }
    
    open() {
        this._popupSelector.classList.add('popup_is-opened');
        document.addEventListener('keydown', this._handleEscClose.bind(this));
    }

    close() {
        this._popupSelector.classList.remove('popup_is-opened');
        document.removeEventListener('keydown', this._handleEscClose.bind(this));
    }

    // метод закрытия попапа нажатием на Esc
    _handleEscClose(evt) {
        if (evt.key === keyEscape) {
            this.close();
        }
    }

    // закрытия попапа кликом на оверлей
    // _handleOverlayClick(evt) {
    //     if (evt.target === evt.currentTarget) {
    //         this.close();
    //     }
    // }

    // метод добавления слушателей
    setEventListeners() {        
        //document.addEventListener('click', this._handleOverlayClick.bind(this));
        // закрытие попапа по крестику
        const closeButtom = this._popupSelector.querySelector('.popup__button_close');
        closeButtom.addEventListener('click', this.close.bind(this));
    }
}