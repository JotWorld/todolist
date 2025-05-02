
import { Status } from '../const/status.js';
import {generateID} from "../utils.js"
import Observable from '../framework/observable.js';
import { UserAction, UpdateType } from '../const.js';
export default class TasksModel extends Observable{
  #tasks = []
  #observers = [];
  #tasksApiService = null;
  get tasks() {
    return this.#tasks;
  }
  constructor({tasksApiService}){
    super();
    this.#tasksApiService = tasksApiService;
    this.#tasksApiService.tasks.then((tasks) => {
    });
  }
  getTasksByStatus(status) {
    return this.#tasks
      .filter(task => task.status === status)
      .sort((a, b) => a.order - b.order);
  }
  
  async moveTaskTo(taskId, newStatus, newIndex) {
    const taskIndex = this.#tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) return;
  
    const [task] = this.#tasks.splice(taskIndex, 1);
    task.status = newStatus;
  
    const tasksOfStatus = this.#tasks
      .filter(t => t.status === newStatus)
      .sort((a, b) => a.order - b.order);
  
    tasksOfStatus.splice(newIndex, 0, task);
    tasksOfStatus.forEach((t, i) => t.order = i);
  
    const otherTasks = this.#tasks.filter(t => t.status !== newStatus);
    this.#tasks = [...otherTasks, ...tasksOfStatus];
  
    try {
      await this.#tasksApiService.updateTask(task);
      this._notify();
    } catch (err) {
      console.error('Ошибка при обновлении задачи на сервере:', err);
    }
  }
  
  

  async updateTaskStatus(taskId, newStatus) {
    const task = this.#tasks.find(t => t.id === Number(taskId));
    if (!task) return;
  
    const updatedTask = { ...task, status: newStatus };
  
    try {
      const response = await this.#tasksApiService.updateTask(updatedTask);
      const index = this.#tasks.findIndex(t => t.id === taskId);
      this.#tasks[index] = response;
      this._notify(UserAction.UPDATE_TASK, response);
    } catch (err) {
      console.error('Ошибка при обновлении задачи:', err);
    }
  }
  
  async addTask(title) {
    const newTask = {
      id: generateID(),
      title,
      status: 'backlog',
      order: this.#tasks.filter(t => t.status === 'backlog').length,
    };
  
    try {
      const createdTask = await this.#tasksApiService.addTask(newTask);
      this.#tasks.push(createdTask);
      this._notify(UserAction.ADD_TASK, createdTask);
      return createdTask;
    } catch (err) {
      console.error('Ошибка при добавлении задачи на сервер:', err);
      throw err;
    }
  }
  async deleteAllTrashTasks() {
    const trashTasks = this.#tasks.filter(task => task.status === 'trash');
  
    try {
      await Promise.all(trashTasks.map((task) => 
        this.#tasksApiService.deleteTask(task.id)
      ));
  
      this.#tasks = this.#tasks.filter(task => task.status !== 'trash');
      this._notify();
    } catch (err) {
      console.error('Ошибка при удалении задач из корзины:', err);
    }
  }
  
  
  async init(){
    try{
      const tasks = await this.#tasksApiService.tasks;
      this.#tasks = tasks;
    }
    catch(err){
        this.#tasks = [];
    }
    this._notify(UpdateType.INIT);
  }
}