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

  constructor({title,status,onTaskDrop}) {
    super();
    this.#title = title;
    this.#status = status;
    this.#setDropHandler(onTaskDrop);
  }

  get template() {
    return createTaskListComponentTemplate(this.#title, this.#status);
  }
  #setDropHandler(onTaskDrop){
    const container = this.element;

    container.addEventListener('dragover', (event) => {
      event.preventDefault();
    })
    container.addEventListener('drop', (event)=> {
      event.preventDefault();
      const taskId = event.dataTransfer.getData('text/plain');
      onTaskDrop(taskId, this.#status);
    })
  }
}
