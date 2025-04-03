import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import {render, RenderPosition} from './framework/render.js';
import TasksModel from './model/task-model.js';
import TasksBoardPresenter from './presenter/tasks-board-presenter.js';


const bodyContainer = document.querySelector('body');

const tasksModel = new TasksModel();
const tasksBoardPresenter = new TasksBoardPresenter({
    boardContainer: bodyContainer,
    tasksModel,
});


render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new FormAddTaskComponent(), bodyContainer);

tasksBoardPresenter.init();