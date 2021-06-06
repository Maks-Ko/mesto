export { FormValidator };

class FormValidator {
    constructor (config, formSelector) {
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._form = formSelector;
        this._formElement = document.querySelector(formSelector);
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    }

    // метод устанавливает обработчик на форму
    enableValidation() {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners(this._formElement);
    }

    // метод, который находит, перебирает и добоаляет каждому полю событие input
    _setEventListeners() {
        this.toggleButtonState(); //this._inputList, this._buttonElement

        this._inputList.forEach((inputElement) => {
            // каждому полю добавим обработчик событий input
            inputElement.addEventListener('input', () => {
                // вызовем isValid, передав ей форму и проверяемый элемент
                this._isValid(inputElement);

                // вызовем toggleButtonState и передадим ей массив полей и кнопку
                this.toggleButtonState(); //this._inputList, this._buttonElement
            });
        });
    }

    // метод переключения кнопки: активная, неактивная
    toggleButtonState = () => {
        if (this._hazInvalidInput(this._inputList)) {
            this._buttonElement.disabled = true;
        } else {
            this._buttonElement.disabled = false;
        }
    }

    // метод проверяет наличие невалидного поля
    _hazInvalidInput = () => {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    // метод проверяет валидность поля
    _isValid = (inputElement) => {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    // метод удаляет класс с ошибкой
    _hideInputError = (inputElement) => {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        // скрываем сообщение об ошибке
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }

    // метод добавляет класс с ошибкой 
    _showInputError = (inputElement, errorMessage) => {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        // показываем сообщение об ошибке
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }
}