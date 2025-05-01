import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import {render, RenderPosition} from './framework/render.js';
import TasksModel from './model/task-model.js';
import TasksBoardPresenter from './presenter/tasks-board-presenter.js';
import TasksApiService from './tasks-api-service.js';
const END_POINT = 'https://6813ac4a129f6313e21203c8.mockapi.io';
const bodyContainer = document.querySelector('body');

const tasksModel = new TasksModel({tasksApiService: new TasksApiService(END_POINT)});
const tasksBoardPresenter = new TasksBoardPresenter({
    boardContainer: bodyContainer,
    tasksModel,
});

const formAddTaskComponent = new FormAddTaskComponent({onClick: handleNewTaskButtonClick});
function handleNewTaskButtonClick(){
    tasksBoardPresenter.createTask() }
render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(formAddTaskComponent, bodyContainer);

tasksBoardPresenter.init();