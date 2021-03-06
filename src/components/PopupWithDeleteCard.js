import Popup from './Popup.js';

export default class PopupWithDeleteCard extends Popup {
    constructor({ popup, handleFormSubmit }) {
        super({ popup });
        this._handleFormSubmit = handleFormSubmit;
    }
    
    setEventListeners() {
        super.setEventListeners();

        this._buttonClous = this._popup.querySelector('.form');
        this._buttonClous.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._action();
            //this._handleFormSubmit();
        });
    }

    setSubmitAction(action) {
        this._action = action;
    }
}