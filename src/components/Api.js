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
        .then(this._checkResponse)
    }

    // получаем данные карточек
    getItemsCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
        .then(this._checkResponse)
    }

    getAllNeededData() {
        return Promise.all([this.getItemsUser(), this.getItemsCards()])
    }

    // редактирование профиля
    editProfile(dataUser) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: dataUser.user_name,
                about: dataUser.activity
            })
        })
        .then(this._checkResponse)
    }

    // добавление карточки
    addCardForm(dataCard) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: dataCard.image_name,
                link: dataCard.url_image
            })
        })
        .then(this._checkResponse)
    }

    // удаление карточки
    deleteCardUser(idCard) {
        return fetch(`${this._baseUrl}/cards/${idCard}`, {
            method: 'DELETE',
            headers: this._headers,
        })
        .then(this._checkResponse)
    }

    // добавление - удаление лайка карточки    
    toggleLikeCard(idCard, isLike) {
        return fetch(`${this._baseUrl}/cards/likes/${idCard}`, {
            method: isLike ? 'DELETE' : 'PUT',
            headers: this._headers,
        })
        .then(this._checkResponse)
    }

    // редактирование аватар
    editAvatar(dataAvatar) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: dataAvatar.url_avatar
              })
        })
        .then(this._checkResponse)
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }
}