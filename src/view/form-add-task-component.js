import { createElement } from '../framework/render.js';

function createFormAddTaskComponentTemplate() {
  return `<section class="task-form">
            <h2>Новая задача</h2>
            <div class="input-container">
              <input type="text" placeholder="Название задачи...">
              <button id="add">+ Добавить</button>
            </div>
          </section>`;
}

export default class FormAddTaskComponent {
  getTemplate() {
    return createFormAddTaskComponentTemplate();
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
