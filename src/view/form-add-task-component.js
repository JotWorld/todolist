import { AbstractComponent } from '../framework/view/abstract-component.js';
function createFormAddTaskComponentTemplate() {
  return `<section class="task-form">
            <h2>Новая задача</h2>
            <div class="input-container">
              <input type="text" placeholder="Название задачи...">
              <button id="add">+ Добавить</button>
            </div>
          </section>`;
}
export default class FormAddTaskComponent extends AbstractComponent {
  #handleClick = null;
  constructor({onClick}){
    super();
    this.#handleClick = onClick;
    this.element.addEventListener('click', this.#clickHandler)
  }
  get template() {
    return createFormAddTaskComponentTemplate();
  }
  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  }
}

