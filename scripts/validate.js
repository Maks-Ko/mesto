// функция, которая добавляет класс с ошибкой 
const showInputError = (formElement, inputElement, errorMessage, config) => {
    const {inputErrorClass, errorClass} = config;
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    // показываем сообщение об ошибке
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
};

// функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, config) => {
    const {inputErrorClass, errorClass} = config;
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    // скрываем сообщение об ошибке
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
};

// функция, которая проверяет валидность поля
const isValid = (formElement, inputElement, config) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, config);
    } else {
        hideInputError(formElement, inputElement, config);
    }
};

// функция, которая проверяет наличие невалидного поля
const hazInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

// функция переключения кнопки: активная, неактивная
const toggleButtonState = (inputList, buttonElement) => {
    if (hazInvalidInput(inputList)) {
        buttonElement.disabled = true;
    } else {
        buttonElement.disabled = false;
    }
}

// функция, которая находит, перебирает и добоаляет каждому полю событие input
const setEventListeners = (formElement, config) => {
    const {inputSelector, submitButtonSelector, ...restConfig} = config;
    // находим все поля внутри формы
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);

    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
        // каждому полю добавим обработчик событий input
        inputElement.addEventListener('input', () => {
            // вызовем isValid, передав ей форму и проверяемый элемент
            isValid(formElement, inputElement, restConfig);

            // вызовем toggleButtonState и передадим ей массив полей и кнопку
            toggleButtonState(inputList, buttonElement);
        });
    });
};

// функция, которая находит и переберает все формы на странице
const enableValidation = (config) => {
    const {formSelector, ...restConfig} = config;
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, restConfig);
    });    
};

enableValidation({
    formSelector: '.form',
    inputSelector: '.form__text',
    submitButtonSelector: '.form__button',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
});