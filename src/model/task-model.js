import { tasks as mockTasks } from '../mock/task.js';
import { Status } from '../const/status.js';
import {generateID} from "../utils.js"
export default class TasksModel {
  #tasks = [...mockTasks];
  #observers = [];
  get tasks() {
    return this.#tasks;
  }

  getTasksByStatus(status) {
    return this.#tasks.filter(task => task.status === status);
  }

  updateTaskStatus(taskId, newStatus) {
    const task = this.#tasks.find(t => t.id === taskId);
    if (task) {
      task.status = newStatus;
    }
  }
  addTask(title){
    const newTask = {
      id: generateID(),
      title,
      status: Status.BACKLOG,
    }
    this.#tasks.push(newTask);
    this._notifyObservers();
    return newTask;
  }
  deleteAllTrashTasks() {
    this.#tasks = this.#tasks.filter((task) => task.status !== Status.TRASH);
    this._notifyObservers();
  }
  
  addObserver(observer){
      this.#observers.push(observer);
  }
  removeObserver(observer){
    this.#observers = this.#observers.filter((obs) => obs !== observer);
  }
  _notifyObservers(){
    this.#observers.forEach((observer) => observer());
  }
}