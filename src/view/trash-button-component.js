import { createElement } from '../framework/render.js';

function createTaskListComponentTemplate() {
    return (
        `
            <button class="button">Очистить</button>`

      );
}

export default class TrashButton {
  getTemplate() {
    return createTaskListComponentTemplate();
  }
  constructor() {
    
}
  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }


  removeElement() {
    this.element = null;
  }
}
