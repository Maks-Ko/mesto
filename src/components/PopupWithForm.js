import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super({ popupSelector });
        this._handleFormSubmit = handleFormSubmit;
    }

    close() {
        super.close();
        this._form.reset();
    }

    _getInputValues() {        
        this._inputList = this._form.querySelectorAll('.form__text');

        this._formValues = {};

        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });

        return this._formValues;

        // // вытаскиваем содержимое инпутов
        // this._inputName = this._formCard.querySelector('.form__text_edit_name');
        // this._inputLink = this._formCard.querySelector('.form__text_edit_about-me');
        
        // // создём оъект и наполяем его
        // this._formValues = {};
        // this._formValues.name = this._inputName.value;
        // this._formValues.link = this._inputLink.value;
        
        // return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        
        this._form = this._popupSelector.querySelector('.form');
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();

            this._handleFormSubmit(this._getInputValues());
        });
    }
}