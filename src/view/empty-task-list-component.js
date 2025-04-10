import { AbstractComponent } from '../framework/view/abstract-component.js';
function createEmptyTaskListComponentTemplate() {
  return (
      `
          <li class="empty">Нет задач в этом списке</li>`

    );
}
export default class EmptyTaskListComponent extends AbstractComponent {
  get template() {
    return createEmptyTaskListComponentTemplate();
  }
}
