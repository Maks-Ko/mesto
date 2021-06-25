import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    
    open(name, link) {
        super.open();
        const popupImg = this._popupSelector.querySelector('.images-content__foto');
        const popupText = this._popupSelector.querySelector('.images-content__title');

        popupText.textContent = name;
        popupImg.src = link;
        popupImg.alt = name;
    }
}