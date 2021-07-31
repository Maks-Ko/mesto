export default class Card {
  constructor (cardData, cardSelector, { handleCardClick, handleDeleteClick }) {
      this._name = cardData.name;
      this._link = cardData.link;
      this._numberLikes = cardData.likes;
      this._user = cardData.owner;
      this._idCard = cardData._id;
      this._cardSelector = cardSelector;
      this._handleCardClick = handleCardClick;
      this._handleDeleteClick = handleDeleteClick;
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
    this._cardLike ();
    this.cardLikeNumder();
    this._addDeleteButtonCard();
    this._openPopupImage ();
    this._deleteCard();


    this._image = this._element.querySelector('.element__foto');      
    this._element.querySelector('.element__title').textContent = this._name;
    this._image.src = this._link;
    this._image.alt = this._name;

    return this._element;
  }

  // кнопка лайка карточки
  _cardLike () {
    this._element.querySelector('.element__like').addEventListener('click', function(like) {
      like.target.closest('.element__like').classList.toggle('element__like_active');
    });
  }

  // количество лайков
  cardLikeNumder() {
    this._element.querySelector('.element__numder-likes').textContent = this._numberLikes.length;
  }

  // убирает кнопку удаления крточки
  _addDeleteButtonCard() {
    this._idUser = this._user._id;
    if (this._idUser == 'e8f05256dab4a2c5dbaf43a4') {
      this._element.querySelector('.element__delete').classList.add('element__delete_show');
    }
  }
  
  // удаление карточки
  cardDelete() {
    this._element.remove();
    this._element = null;
  }

  // слушатель удаление карточки
  _deleteCard() {
    this._element.querySelector('.element__delete').addEventListener('click', (evt) => {
      evt.preventDefault();   
      this._handleDeleteClick(this);
    });
  }

  // слушатель открытие попапа картинки
  _openPopupImage () {
    this._element.querySelector('.element__foto').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}