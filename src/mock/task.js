import { Status } from "../const/status.js";

export const tasks = [
    { id: 1, title: "Выучить JS", status: Status.BACKLOG, order: 0 },
    { id: 2, title: "Выучить React", status: Status.BACKLOG, order: 1 },
    { id: 3, title: "Сделать домашку", status: Status.BACKLOG, order: 2 },
    { id: 4, title: "Выпить смузи", status: Status.PROCESSING, order: 0 },
    { id: 5, title: "Попить воды", status: Status.PROCESSING, order: 1 },
    { id: 6, title: "Позвонить маме", status: Status.DONE, order: 0 },
    { id: 7, title: "Погладить кота", status: Status.DONE, order: 1 },
    { id: 8, title: "Сходить погулять", status: Status.TRASH, order: 0 },
    { id: 9, title: "Прочитать 'Войну и мир'", status: Status.TRASH, order: 1 }
];
