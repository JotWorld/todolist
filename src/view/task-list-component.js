import { createElement } from '../framework/render.js';
import TaskComponent from './task-component.js';
import { render } from '../framework/render.js';

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

  renderTasks() {
    const ulElement = this.getElement().querySelector('.task-column');
    this.tasks.forEach(task => {
      render(new TaskComponent(task), ulElement);
    });
  }

  removeElement() {
    this.element = null;
  }
}
