// import TasksListComponent from "../view/task-list-component.js";
// import TaskComponent from "../view/task-component.js";
// import BoardComponent from "../view/task-board-component.js";
// import { render } from "../framework/render.js";
// import {Status, StatusLabel} from "../const/status.js";
// import TrashButton from "../view/trash-button-component.js";

// export default class TasksBoardPresenter {
//     #boardContainer = null;
//     #tasksModel = null;
//     #tasksBoardComponent = new BoardComponent();

//     constructor({boardContainer, tasksModel}){
//         this.#boardContainer = boardContainer;
//         this.#tasksModel = tasksModel;
//     }

//    init(){
//     this.boardTasks = [...this.#tasksModel.tasks];
//     const statuses = Object.values(Status);
//     render(this.#tasksBoardComponent, this.#boardContainer);

//     for(let i = 0;i < statuses.length; i++){
//         const currentStatus = statuses[i];
//         const listComponent = new TasksListComponent({
//             title: StatusLabel[currentStatus],
//             status: currentStatus
//         });

//         render(listComponent, this.#tasksBoardComponent.element);
//         const taskListComponent = listComponent.element;

//         const filteredTasks = this.boardTasks.filter(task => task.status === currentStatus)


//         for(let j = 0; j < filteredTasks.length; j++){
//             console.log(filteredTasks[j].title);
//             const taskComponent = new TaskComponent(filteredTasks[j].title);
            
//             render(taskComponent, taskListComponent.querySelector('.task-column'))  
//         }
//         if(currentStatus == 'trash'){
//             render(new TrashButton(),taskListComponent);
//         }
//     }
//    }

      
// }
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
  }
  init() {
    this.#boardTasks = [...this.#tasksModel.tasks];
    this.#renderBoard();

    const statuses = Object.values(Status);
    for (let i = 0; i < statuses.length; i++) {
      const currentStatus = statuses[i];
      const filteredTasks = this.#boardTasks.filter((task) => task.status === currentStatus);
      this.#renderTasksList(currentStatus, filteredTasks);
    }
  }
  #renderBoard() {
    render(this.#tasksBoardComponent, this.#boardContainer);
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
    render(new TrashButton(), container);
  }
  #renderEmptyList(container){
    render(new EmptyTaskListComponent(), container);
  }
}
