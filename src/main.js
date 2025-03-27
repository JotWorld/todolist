import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import TaskBoardComponent from './view/task-board-component.js';
import { render, RenderPosition } from './framework/render.js';
import TaskListComponent from './view/task-list-component.js';
import TaskComponent from './view/task-component.js';

const bodyContainer = document.querySelector('body');

render(new HeaderComponent(), bodyContainer, RenderPosition.AFTERBEGIN);
render(new FormAddTaskComponent(), bodyContainer);
const taskBoardComponent = new TaskBoardComponent();
render(taskBoardComponent, bodyContainer);



for (let i = 0; i<4;i++){
    const taskListComponent = new TaskListComponent();
    render(taskListComponent, taskBoardComponent.getElement())

    for (let j = 0; j < 4; j++) {
        const taskComponent = new TaskComponent()
        render(taskComponent, taskListComponent.getElement().querySelector('.task-column'))
    }
}