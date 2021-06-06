//import { config, formSelector } from './initial-сards.js';
export { FormValidator };

class FormValidator {
    constructor (config, formSelector) {
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;        
        this._form = formSelector;
        this._formElement = document.querySelector(this._form);
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    }

    // метод устанавливает обработчик на форму
    enableValidation() {        
        //const formElement = document.querySelector(this._form);
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners(this._formElement);
    }

    // метод, который находит, перебирает и добоаляет каждому полю событие input
    _setEventListeners(formElement) {
        //const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
        //const buttonElement = formElement.querySelector(this._submitButtonSelector);

        this.toggleButtonState(this._inputList, this._buttonElement);

        this._inputList.forEach((inputElement) => {
            // каждому полю добавим обработчик событий input
            inputElement.addEventListener('input', () => {
                // вызовем isValid, передав ей форму и проверяемый элемент
                this._isValid(formElement, inputElement);

                // вызовем toggleButtonState и передадим ей массив полей и кнопку
                this.toggleButtonState(this._inputList, this._buttonElement);
            });
        });
    }

    // метод переключения кнопки: активная, неактивная
    toggleButtonState = (inputList, buttonElement) => {
        if (this._hazInvalidInput(inputList)) {
            buttonElement.disabled = true;
        } else {
            buttonElement.disabled = false;
        }
    }

    // метод проверяет наличие невалидного поля
    _hazInvalidInput = (inputList) => {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    // метод проверяет валидность поля
    _isValid = (formElement, inputElement) => {
        if (!inputElement.validity.valid) {
            this._showInputError(formElement, inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(formElement, inputElement);
        }
    }

    // метод удаляет класс с ошибкой
    _hideInputError = (formElement, inputElement) => {
        const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        // скрываем сообщение об ошибке
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }

    // метод добавляет класс с ошибкой 
    _showInputError = (formElement, inputElement, errorMessage) => {
        const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        // показываем сообщение об ошибке
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }
}