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
    const column = this.element.querySelector('.task-column');

    column.addEventListener('dragover', (event) => {
      event.preventDefault();
  
      const afterElement = this.#getDragAfterElement(column, event.clientY);
      const draggingId = event.dataTransfer.getData('text/plain');
      const draggingElement = document.querySelector(`[data-id='${draggingId}']`);


      if (!draggingElement) return;
  
      if (afterElement == null) {
          column.appendChild(draggingElement);
      } else {
          column.insertBefore(draggingElement, afterElement);
      }
  });
  

  column.addEventListener('drop', (event)=> {
    event.preventDefault();
    const taskId = event.dataTransfer.getData('text/plain');
  
    const afterElement = this.#getDragAfterElement(column, event.clientY);
    const items = [...column.querySelectorAll('li')];
  
    let index;
    if (afterElement == null) {
      index = items.length;
    } else {
      index = items.indexOf(afterElement);
    }
  
    onTaskDrop(taskId, this.#status, index);
  });
  
  
}
#getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('li:not(.dragging)')];

  return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
      } else {
          return closest;
      }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

}
