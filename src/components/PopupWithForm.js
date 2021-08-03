import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({ popup, handleFormSubmit }) {
        super({ popup });
        this._handleFormSubmit = handleFormSubmit;
        this._form = popup.querySelector('.form');
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
    }
    
    // метод уведомления пользователя о сохранении данных
    renderLoading({ isLoading }) {
        this._status = this._form.querySelector('.form__button');
        if(isLoading) {
            this._status.textContent = "Сохранение...";
        } else {
            this._status.textContent = "Сохранить";
        }

    } 

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();

            this._handleFormSubmit(this._getInputValues());
        });
    }
}