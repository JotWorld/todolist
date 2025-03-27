import { createElement } from '../framework/render.js';

function createTaskListComponentTemplate() {
  return `<div class="task-group">
            <div class="task-header">Вставить текст</div>
            <ul class="task-column"></ul>
          </div>`;
}

export default class TaskListComponent {
  getTemplate() {
    return createTaskListComponentTemplate(this.title);
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
