export default class Api {
    constructor({ baseUrl, headers, body, idCard }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
        this._body = body;
        this._idCard = idCard;
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
    editProfile() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: this._body
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);            
        })
    }

    // добавление карточки
    addCardForm() {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: this._body
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);            
        })
    }

    // удаление карточки
    deleteCardUser() {
        return fetch(`${this._baseUrl}/cards/${this._idCard}`, {
            method: 'DELETE'
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);            
        })
    }

}