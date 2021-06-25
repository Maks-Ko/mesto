import { popupImageContent, popupImageTitle} from '../utils/constants.js';
import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor({ popupSelector }) {
       super({ popupSelector });
    }    

    open(name, link) {
        this._popupSelector.classList.add('popup_is-opened');
        popupImageTitle.textContent = name;
        popupImageContent.src = link;
        popupImageContent.alt = name;
        document.addEventListener('keydown', this._handleEscClose.bind(this));
    }
}