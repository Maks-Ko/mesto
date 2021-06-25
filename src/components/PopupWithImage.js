import { popupImageContent, popupImageTitle} from '../utils/constants.js';
import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor({ popupSelector }) {
       super({ popupSelector });
    }

    open(name, link) {
        super.open();
        popupImageTitle.textContent = name;
        popupImageContent.src = link;
        popupImageContent.alt = name;
    }
}