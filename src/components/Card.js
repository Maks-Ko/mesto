// import { handleCardClick } from '../pages/index.js';

export default class Card {
  constructor (cardData, cardSelector, { handleCardClick }) {
      this._name = cardData.name;
      this._link = cardData.link;
      this._cardSelector = cardSelector;
      this._handleCardClick = handleCardClick 
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
    this._cardDelete ();
    this._openPopupImage ();

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
  
  // удаление карточки
  _cardDelete () {
    this._element.querySelector('.element__delete').addEventListener('click', function(del) {
      del.target.closest('.element').remove();
    });
  }
  
  // открытие попапа картинки
  _openPopupImage () {
    this._element.querySelector('.element__foto').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}