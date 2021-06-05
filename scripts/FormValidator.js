import { config } from './initial-сards.js';
export { FormValidator };

class FormValidator {
    constructor (config) {
        this._formSelector = config.formSelector;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
    }

    // метод который находит все формы на странице
    enableValidation() {
        const formList = Array.from(document.querySelectorAll(this._formSelector));
        formList.forEach((formElement) => {
            formElement.addEventListener('submit', (evt) => {
                evt.preventDefault();
            });
            this.setEventListeners(formElement);
        });  
    }

    // метод, который находит, перебирает и добоаляет каждому полю событие input
    setEventListeners(formElement) {
        const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
        const buttonElement = formElement.querySelector(this._submitButtonSelector);

        this.toggleButtonState(inputList, buttonElement);

        inputList.forEach((inputElement) => {
            // каждому полю добавим обработчик событий input
            inputElement.addEventListener('input', () => {
                // вызовем isValid, передав ей форму и проверяемый элемент
                this.isValid(formElement, inputElement);

                // вызовем toggleButtonState и передадим ей массив полей и кнопку
                this.toggleButtonState(inputList, buttonElement);
            });
        });
    }

    // метод переключения кнопки: активная, неактивная
    toggleButtonState = (inputList, buttonElement) => {
        if (this.hazInvalidInput(inputList)) {
            buttonElement.disabled = true;
        } else {
            buttonElement.disabled = false;
        }
    }

    // метод проверяет наличие невалидного поля
    hazInvalidInput = (inputList) => {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    // метод проверяет валидность поля
    isValid = (formElement, inputElement) => {
        if (!inputElement.validity.valid) {
            this.showInputError(formElement, inputElement, inputElement.validationMessage);
        } else {
            this.hideInputError(formElement, inputElement);
        }
    }

    // метод удаляет класс с ошибкой
    hideInputError = (formElement, inputElement) => {
        const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        // скрываем сообщение об ошибке
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }

    // метод добавляет класс с ошибкой 
    showInputError = (formElement, inputElement, errorMessage) => {
        const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        // показываем сообщение об ошибке
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }
}

const form = new FormValidator(config);

form.enableValidation();