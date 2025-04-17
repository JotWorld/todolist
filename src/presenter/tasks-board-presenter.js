import TasksListComponent from "../view/task-list-component.js";
import TaskComponent from "../view/task-component.js";
import BoardComponent from "../view/task-board-component.js";
import { render } from "../framework/render.js";
import { Status, StatusLabel } from "../const/status.js";
import TrashButton from "../view/trash-button-component.js";
import EmptyTaskListComponent from "../view/empty-task-list-component.js";

export default class TasksBoardPresenter {
  #boardContainer = null;
  #tasksModel = null;
  #tasksBoardComponent = new BoardComponent();
  #boardTasks = [];

  constructor({ boardContainer, tasksModel }) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;

    this.#tasksModel.addObserver(this.#handleModelChange.bind(this));
  }
  init() {
    this.#boardTasks = [...this.#tasksModel.tasks];
    this.#renderBoard();
  }

  #renderBoard() {
    render(this.#tasksBoardComponent, this.#boardContainer);
    const statuses = Object.values(Status);
    for (let i = 0; i < statuses.length; i++) {
      const currentStatus = statuses[i];
      const filteredTasks = this.tasks.filter((task) => task.status === currentStatus);
      this.#renderTasksList(currentStatus, filteredTasks);
    }
  }

  #renderTasksList(status, tasks) {
    const listComponent = new TasksListComponent({
      title: StatusLabel[status],
      status: status
    });

    render(listComponent, this.#tasksBoardComponent.element);
    const taskColumn = listComponent.element.querySelector('.task-column');
    if (tasks.length === 0){
        this.#renderEmptyList(taskColumn);
    }
    for (let j = 0; j < tasks.length; j++) {
      this.#renderTask(tasks[j].title, taskColumn);
    }

    if ((status === 'trash') & (tasks.length > 0)) {
      this.#renderTrashButton(listComponent.element);
    }
  }

  #renderTask(task, container) {
    const taskComponent = new TaskComponent(task);
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
  createTask(){
    const taskTitle = document.querySelector("input").value.trim();
    if (!taskTitle){
      return;
    }
    this.#tasksModel.addTask(taskTitle);

    document.querySelector("input").value = "";
  }
  #handleModelChange(){
    this.#clearBoard();
    this.#renderBoard();
  }
  #clearBoard(){
    this.#tasksBoardComponent.element.innerHTML = '';
  }
  get tasks(){
    return this.#tasksModel.tasks;
  }
}
