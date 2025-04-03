import {Status} from "../const/status.js";
export const tasks = [
    { id: 1, title: "Выучить JS", status: Status.BACKLOG },
    { id: 2, title: "Выучить React", status: Status.BACKLOG },
    { id: 3, title: "Сделать домашку", status: Status.BACKLOG },
    { id: 4, title: "Выпить смузи", status: Status.PROCESSING },
    { id: 5, title: "Попить воды", status: Status.PROCESSING },
    { id: 6, title: "Позвонить маме", status: Status.DONE},
    { id: 7, title: "Погладить кота", status: Status.DONE },
    { id: 8, title: "Сходить погулять", status: Status.TRASH },
    { id: 9, title: "Прочитать 'Войну и мир'", status: Status.TRASH }
];
