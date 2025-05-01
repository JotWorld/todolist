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
    return this.#tasks
      .filter(task => task.status === status)
      .sort((a, b) => a.order - b.order);
  }
  
  moveTaskTo(taskId, newStatus, newIndex) {
    const taskIndex = this.#tasks.findIndex(t => t.id === Number(taskId));
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

    this._notifyObservers();
  }
  

  updateTaskStatus(taskId, newStatus) {
    const task = this.#tasks.find(t => t.id === Number(taskId));
    if (task) {
      task.status = newStatus;
      this._notifyObservers();
  }}
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