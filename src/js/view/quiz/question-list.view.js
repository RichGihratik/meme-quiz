import { 
    className,
    tabClass,
    activeClass
}
from "../../../html/question-list.template";

export class QuestionListView {
  #element = undefined;
  #tabs = [];

  #active = -1;

  set active(num) {
    this.#active = num;
    this.update();
  }

  get created() {
    return this.#element !== undefined;
  }

  createView(element, themes) {
    if (this.#element !== undefined) throw new Error("View already exists!");
    this.#element = element;

    element.textContent = "";
    element.classList.add(className);

    for (let item of themes) {
      let tab = document.createElement("div");
      tab.classList.add(tabClass);
      tab.textContent = item.name;
      element.appendChild(tab);
      this.#tabs.push(tab);
    }

    this.update();
  }

  update() {
    if (this.#element !== undefined) {
      for (let tab of this.#tabs) {
        tab.classList.remove(activeClass);
      }
      if (this.#active !== -1) {
        this.#tabs[this.#active].classList.add(activeClass);
      }
    }
  }

  removeView() {
    if (this.#element === undefined) throw new Error("View does not exists!");

    this.#tabs = [];
    this.#active = -1;
    this.#element.textContent = "";
    this.#element = undefined;
  }
}