import { 
    startTemplate,
    startBtnId 
} from "../../../html/start.template";

import { Event } from "../../common/event";

export class StartView {
  #element = undefined;

  #locFiles = undefined;

  startEvent = new Event();

  set locFiles(locFiles) {
    this.#locFiles = locFiles;
    this.updateView();
  }

  createView(element, locFiles) {
    if (this.#element !== undefined) throw new Error("View already created!");
    this.#element = element;
    this.#locFiles = locFiles;

    this.updateView();
  }

  get created() {
    return this.#element !== undefined;
  }

  updateView() {
    if (this.#element !== undefined) {
      this.#element.textContent = "";

      let regex = /{{([^{}]*)}}/g;

      let template = startTemplate.replace(regex, (match, tagName) => {
        let component = this.#locFiles[tagName];
        if (component !== undefined) return component;
        else return `<strong> TAG "${tagName}" NOT FOUND! </strong>`;
      });

      this.#element.insertAdjacentHTML("beforeend", template);

      let startBtn = this.#element.querySelector('.' + startBtnId);

      startBtn.onclick = () => this.startEvent.invoke();
    }
  }

  removeView() {
    if (this.#element === undefined) throw new Error("View does not exist!");

    this.#locFiles = undefined;

    this.#element.textContent = "";
    this.#element = undefined;
  }
}