const formElement = document.querySelector('.form');
const formInput = formElement.querySelector('.form__text');
//выбираем элемент ошибки на основе уникального класса
const formError = formElement.querySelector(`.${formInput.id}-error`);

// функция, которая добавляет класс с ошибкой 
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('form__input_type_error');
    // показываем сообщение об ошибке
    errorElement.textContent = errorMessage;
    errorElement.classList.add('form__input-error_active');
};

// функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('form__input_type_error');
    // скрываем сообщение об ошибке
    errorElement.classList.remove('form__input-error_active');
    errorElement.textContent = '';
};

// функция, которая проверяет валидность поля
const isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
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
const setEventListeners = (formElement) => {
    // находим все поля внутри формы
    const inputList = Array.from(formElement.querySelectorAll('.form__text'));
    const buttonElement = formElement.querySelector('.form__button');

    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
        // каждому полю добавим обработчик событий input
        inputElement.addEventListener('input', () => {
            // вызовем isValid, передав ей форму и проверяемый элемент
            isValid(formElement, inputElement);

            // вызовем toggleButtonState и передадим ей массив полей и кнопку
            toggleButtonState(inputList, buttonElement);
        });
    });
};

// функция, которая находит и переберает все формы на странице
const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.form'));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement);
    });    
};

enableValidation();