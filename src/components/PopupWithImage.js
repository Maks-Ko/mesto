import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor({ popup }) {
        super({ popup });
        this._popupImg = popup.querySelector('.images-content__foto');
        this._popupText = popup.querySelector('.images-content__title');
    }
    
    open(name, link) {
        super.open();
        this._popupText.textContent = name;
        this._popupImg.src = link;
        this._popupText.alt = name;
    }
}