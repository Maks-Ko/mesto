import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super({ popupSelector });
        this._handleFormSubmit = handleFormSubmit;
    }

    _getInputValues() {
        // вытаскиваем содержимое инпутов
        this._inputName = this._formCard.querySelector('.form__text_edit_name');
        this._inputLink = this._formCard.querySelector('.form__text_edit_about-me');
        
        // создём оъект и наполяем его
        this._formValues = {};
        this._formValues.name = this._inputName.value;
        this._formValues.link = this._inputLink.value;
        
        return this._formValues;
    }

    setEventListeners() {        
        this._closeButtom = this._popupSelector.querySelector('.popup__button-close');
        this._closeButtom.addEventListener('click', this.close.bind(this));
        
        this._formCard = this._popupSelector.querySelector('.form');
        this._formCard.addEventListener('submit', (evt) => {
            evt.preventDefault();

            this._handleFormSubmit(this._getInputValues());
            this.close();
        });
    }
}