import { tasks } from '../mock/task.js';

export default class TasksModel {
    #boardtasks = [...tasks];
    getTasksByStatus(status) {
        return this.tasks.filter(task => task.status === status);
    }

    deleteAllTrashTasks() {
        this.tasks = this.tasks.filter(task => task.status !== "trash");
    }
}
