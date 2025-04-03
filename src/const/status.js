const Status = {
    BACKLOG: `backlog`,
    PROCESSING: `in-process`,
    DONE: `done`,
    TRASH: `trash`,
};

const StatusLabel = {
    [Status.BACKLOG]: `Бэклог`,
    [Status.PROCESSING]: `В процессе`,
    [Status.DONE]: `Готово`,
    [Status.TRASH]: `Корзина`,
};

export {Status, StatusLabel};