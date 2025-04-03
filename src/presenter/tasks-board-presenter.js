import TaskBoardComponent from '../view/task-board-component.js';
import TaskListComponent from '../view/task-list-component.js';
import TaskComponent from '../view/task-component.js';
import { render } from '../framework/render.js';
import {status} from '../const/status.js';

export default class TasksBoardPresenter {
    #boardContainer = null;
    #tasksModel = null;
    #tasksBoardComponent = new TaskBoardComponent();
    constructor({boardContainer,tasksModel}){
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel;
    }
    
    init() {
        const statuses = Object.values(status);
        console.log(statuses);
        render(this.#tasksBoardComponent.getElement(), this.#boardContainer);
        for (let i = 0; i<statuses.length;i++){
            
            const currentStatus = statuses[i];
            console.log(currentStatus);
            const tasksList = this.#tasksModel.getTasksByStatus(currentStatus);
            const taskListComponent = new TaskListComponent({status: currentStatus});
            render(taskListComponent, this.#tasksBoardComponent.getElement());
        
            for (let j = 0; j < tasksList.length; j++) {
                const taskComponent = new TaskComponent({task: this.boardTasks[j]})
                render(taskComponent, taskListComponent.getElement().querySelector('.task-column'))
            }
        }
    }
}
