import { AbstractComponent } from '../framework/view/abstract-component.js';
function createTaskListComponentTemplate() {
    return (
        `
            <button class="button">Очистить</button>`

      );
}

export default class ClearTrashButtonComponent extends AbstractComponent {

  get template() {
    return createTaskListComponentTemplate();
  }

}