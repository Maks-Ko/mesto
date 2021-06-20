import Card from './Card.js';
import { cardSelector } from '../utils/constants.js';

export default class Section {
    constructor({ items }, containerSelector) {
        this._initialItems = items;
        //this._renderer = renderer;
        this._container = document.querySelector('.elements');
    }

    // отрисовка всех элементов
    renderItems() {
        this._initialItems.forEach((data) => {
            const cards = new Card(data, cardSelector).generateCard();
            this.addItem(cards);
        })
    }

    // добавление в контейнер
    addItem(element) {
        this._container.append(element);
    }
}