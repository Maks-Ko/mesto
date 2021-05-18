const formElement = document.querySelector('.form');
const formInput = formElement.querySelector('.form__text');

// функция, которая добавляет класс с ошибкой 
const showInputError = (element) => {
    element.classList.add('form__input_type_error');
};

// функция, которая удаляет класс с ошибкой
const hideInputError = (element) => {
    element.classList.remove('form__input_type_error');
};

// функция, которая проверяет валидность поля
const isValid = () => {
    if (!formInput.validity.valid) {
        showInputError(formInput);
    } else {
        hideInputError(formInput);
    }
};

formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
});

// вызываем функцию isValid на каждый ввод символа
formInput.addEventListener('input', isValid);