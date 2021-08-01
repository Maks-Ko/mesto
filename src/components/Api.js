export default class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    // получаем данные пользователя
    getItemsUser() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    // получаем данные карточек
    getItemsCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);            
        })
    }

    getAllNeededData() {
        return Promise.all([this.getItemsUser(), this.getItemsCards()])
    }

    // редактирование профиля
    editProfile({ bodyUser }) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: bodyUser
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);            
        })
    }

    // добавление карточки
    addCardForm({ bodyAddCard }) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: bodyAddCard
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);            
        })
    }

    // удаление карточки
    deleteCardUser(idCard) {
        return fetch(`${this._baseUrl}/cards/${idCard}`, {
            method: 'DELETE',
            headers: this._headers,
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);            
        })
    }

    // добавление - удаление лайка карточки    
    toggleLikeCard(idCard, isLike) {
        return fetch(`${this._baseUrl}/cards/likes/${idCard}`, {
            method: isLike ? 'DELETE' : 'PUT',
            headers: this._headers,
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);            
        })
    }

    // редактирование аватар
    editAvatar({ bodyAvatar }) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: bodyAvatar
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }
}