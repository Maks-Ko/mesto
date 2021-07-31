export default class Card {
  constructor (cardData, cardSelector, { handlePopupImageCard, handleDeleteCard, handleleLikeCard }) {
      this._name = cardData.name;
      this._link = cardData.link;
      this._numberLikes = cardData.likes;
      this._idUser = cardData.owner._id;
      this._idCard = cardData._id;
      this._cardSelector = cardSelector;
      this._handlePopupImageCard = handlePopupImageCard;
      this._handleDeleteCard = handleDeleteCard;
      this._handleLikeCard = handleleLikeCard;
  }

  // клонируем разметку карточки из HTML
  _getTemplate () {
    const cardSelector = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
    // возращаем DOM-элемент карточки
    return cardSelector;
  }

  // создаём новую карточку
  generateCard () {
    this._element = this._getTemplate ();
    //this._cardLike ();
    this.cardLikeNumder();
    this._addDeleteButtonCard();
    //this.isLike();
    
    this._deleteCard();
    this._likeCard()
    this._openPopupImage();

    this._image = this._element.querySelector('.element__foto');      
    this._element.querySelector('.element__title').textContent = this._name;
    this._image.src = this._link;
    this._image.alt = this._name;

    return this._element;
  }

  // количество лайков
  cardLikeNumder() {
    this._element.querySelector('.element__numder-likes').textContent = this._numberLikes.length;
    if (this._numberLikes.filter(item => item._id == 'e8f05256dab4a2c5dbaf43a4').length > 0) {
      this._element.querySelector('.element__like').classList.add('element__like_active');
    }
  }

  // возращает true ели лайк поставлен или false если лайк отсутсвует
  isLike() {
    return this._isLike;
  }

  // кнопка лайка карточки
  isLikeButton(data) {
    this._result = data.likes.filter(item => item._id == 'e8f05256dab4a2c5dbaf43a4');
    this._isLike = this._result.length > 0;
    this._element.querySelector('.element__numder-likes').textContent = data.likes.length;
    if (this._isLike) {
      this._element.querySelector('.element__like').classList.add('element__like_active');
    } else {
      this._element.querySelector('.element__like').classList.remove('element__like_active');
    }
  }

  // убирает кнопку удаления крточки
  _addDeleteButtonCard() {
    // this._idUser = this._user._id;
    if (this._idUser == 'e8f05256dab4a2c5dbaf43a4') {
      this._element.querySelector('.element__delete').classList.add('element__delete_show');
    }
  }
  
  // удаление карточки
  cardDelete() {
    this._element.remove();
    this._element = null;
  }

  // слушатель удаления карточки
  _deleteCard() {
    this._element.querySelector('.element__delete').addEventListener('click', (evt) => {
      evt.preventDefault();
      this._handleDeleteCard(this);
    });
  }
  
  // слушатель лайа карточки
  _likeCard() {
    this._element.querySelector('.element__like').addEventListener('click', (evt) => {
      evt.preventDefault();
      this._handleLikeCard(this);      
    });
  }

  // слушатель открытия попапа картинки
  _openPopupImage () {
    this._element.querySelector('.element__foto').addEventListener('click', (evt) => {
      evt.preventDefault();
      this._handlePopupImageCard(this._name, this._link);
    });
  }
}