import { createElement } from '../framework/render.js';

function createTaskListComponentTemplate(title, status) {

    return (
        `
        <div class="task-group">
            <div class="task-header ${status}-header">${title}</div>
            <ul class="task-column ${status}"></ul>
        </div>  
`
      );
}

export default class TaskListComponent {
  getTemplate() {
    return createTaskListComponentTemplate(this.title, this.status);
  }
  constructor({ title, status }) {
    this.title = title;
    this.status = status;
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
