export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._initialItems = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    // отрисовка всех элементов
    renderItems() {
        this._initialItems.forEach((data) => {
            this._renderer(data);
        });
    }

    // добавление в контейнер
    addItem(element) {
        this._container.prepend(element);
    }
}