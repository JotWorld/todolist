import { AbstractComponent } from '../framework/view/abstract-component.js';

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

export default class TaskListComponent extends AbstractComponent {
  #title;
  #status;

  constructor({title,status}) {
    super();
    this.#title = title;
    this.#status = status;
  }

  get template() {
    return createTaskListComponentTemplate(this.#title, this.#status);
  }
}
