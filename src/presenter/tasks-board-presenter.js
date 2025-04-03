import TasksListComponent from "../view/task-list-component.js";
import TaskComponent from "../view/task-component.js";
import BoardComponent from "../view/task-board-component.js";
import { render } from "../framework/render.js";
import {Status, StatusLabel} from "../const/status.js";

export default class TasksBoardPresenter {
    #boardContainer = null;
    #tasksModel = null;
    #tasksBoardComponent = new BoardComponent();

    constructor({boardContainer, tasksModel}){
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel;
    }


    init(){
        this.boardTasks = [...this.#tasksModel.getTasks()];
        const statues = Object.values(Status);

        render(this.#tasksBoardComponent, this.#boardContainer);

        for(let i = 0;i < statues.length; i++){
            const currentStatus = statues[i];
            const listComponent = new TasksListComponent({
                title: StatusLabel[currentStatus],
                status: currentStatus
            });

            render(listComponent, this.#tasksBoardComponent.getElement());
            const taskListComponent = listComponent.getElement();

            const filteredTasks = this.boardTasks.filter(task => task.status === currentStatus)
            

            for(let j = 0; j < filteredTasks.length; j++){
                console.log(filteredTasks[j]);
                const taskComponent = new TaskComponent(filteredTasks[j].title);
                render(taskComponent, taskListComponent.querySelector('.task-column'))  
            }
        }
    }
}