import TasksListComponent from "../view/task-list-component.js";
import TaskComponent from "../view/task-component.js";
import BoardComponent from "../view/task-board-component.js";
import { render } from "../framework/render.js";
import { Status, StatusLabel } from "../const/status.js";
import TrashButton from "../view/trash-button-component.js";
import EmptyTaskListComponent from "../view/empty-task-list-component.js";
import { UserAction } from "../const.js";
import LoadingViewComponent from "../view/loading-view-component.js";

export default class TasksBoardPresenter {
  #boardContainer = null;
  #tasksModel = null;
  #tasksBoardComponent = new BoardComponent();
  #loadingComponent = new LoadingViewComponent();

  constructor({ boardContainer, tasksModel }) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;

    this.#tasksModel.addObserver(this.#handleModelChange.bind(this));
  }
  async init() {
    render(this.#loadingComponent, this.#boardContainer);
    await this.#tasksModel.init();
    this.#loadingComponent.element.remove();
    this.#clearBoard();
    this.#renderBoard();
  
  }
 

  #renderBoard() {
    render(this.#tasksBoardComponent, this.#boardContainer);
    const statuses = Object.values(Status);
    for (let i = 0; i < statuses.length; i++) {
      const currentStatus = statuses[i];
      const filteredTasks = this.#tasksModel.getTasksByStatus(currentStatus);
      this.#renderTasksList(currentStatus, filteredTasks);
    }
  }

  #renderTasksList(status, tasks) {
    const listComponent = new TasksListComponent({
      title: StatusLabel[status],
      status: status,
      onTaskDrop: this.#handleTaskDrop.bind(this)
    });

    render(listComponent, this.#tasksBoardComponent.element);
    const taskColumn = listComponent.element.querySelector('.task-column');
    if (tasks.length === 0){
        this.#renderEmptyList(taskColumn);
    }
    for (let j = 0; j < tasks.length; j++) {
      this.#renderTask(tasks[j], taskColumn);
    }

    if ((status === 'trash') & (tasks.length > 0)) {
      this.#renderTrashButton(listComponent.element);
    }
  }

  #renderTask(task, container) {
    const taskComponent = new TaskComponent({task});
    render(taskComponent, container);
  }

  #renderTrashButton(container) {
    const buttonComponent = new TrashButton(() => {
      this.#tasksModel.deleteAllTrashTasks();
    });
    render(buttonComponent, container);
  }
  

  #renderEmptyList(container){
    render(new EmptyTaskListComponent(), container);
  }
async createTask() {
  const taskTitle = document.querySelector("input").value.trim();
  if (!taskTitle) return;
  try{
    await this.#tasksModel.addTask(taskTitle);
    document.querySelector("input").value = "";
  }
catch(err){
  console.error('Ошибка при создании задачи: ', err)
}
}

  #handleModelChange(){
    this.#clearBoard();
    this.#renderBoard();
  }
  #clearBoard(){
    this.#tasksBoardComponent.element.innerHTML = '';
  }
  #handleTaskDrop(taskId, newStatus, index){
    try{
      this.#tasksModel.moveTaskTo(taskId, newStatus, index);
      this.#tasksModel.updateTaskStatus(taskId, newStatus);
    }
    catch(err){
        console.error('Ошибка при обновлении статуса задачи:', err)
    }
  }
  #handleModelEvent(event, payload){
    switch(event){
      case UserAction.ADD_TASK:
      case UserAction.UPDATE_TASK:
      case UserAction.DELETE_TASK:
        this.#clearBoard();
        this.#renderBoard();
        break;
    }
  }

  get tasks(){
    return this.#tasksModel.tasks;
  }
}
