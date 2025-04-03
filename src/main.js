import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import TasksModel from './model/task-model.js';
import TasksBoardPresenter from './presenter/tasks-board-presenter.js';
import { render, RenderPosition } from './framework/render.js';

const bodyContainer = document.querySelector('body');

render(new HeaderComponent(), bodyContainer, RenderPosition.AFTERBEGIN);
render(new FormAddTaskComponent(), bodyContainer);

const tasksModel = new TasksModel();
const tasksBoardPresenter = new TasksBoardPresenter(bodyContainer, tasksModel);
tasksBoardPresenter.init();
