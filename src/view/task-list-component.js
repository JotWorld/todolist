import { createElement } from '../framework/render.js';

function createTaskListComponentTemplate(status) {
  const clearButton = status === "trash" ? `<button class="clear">Очистить</button>`:'';

    return (
        `
        <div class="task-list">
            <h3 class="${status}">${status}</h3>
            <ul class="tasks-container"></ul>
            
        </div>  
`
      );
}

export default class TaskListComponent {
  getTemplate() {
    return createTaskListComponentTemplate(this.title);
  }
  constructor(status){
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
