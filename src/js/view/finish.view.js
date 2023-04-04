import {
  finishTemplate,
  scoreId,
  playAgainId,
  backId
} from "../../html/finish.template";

import { Event } from "../common/event";

export class FinishView {
  #created = false;
  #loc = undefined;
  #score = 0;

  playAgainEvent = new Event();
  backEvent = new Event();

  get created() {
    return this.#created;
  }

  set loc(loc) {
    this.#loc = loc;
    this.update();
  }

  set score(score) {
    this.#score = score;
    this.update();
  } 

  update() {
    if (this.created) {
        document.body.textContent = "";
        let regex = /{{([^{}]*)}}/g;

        let template = finishTemplate.replace(regex, (match, tagName) => {
          let component = this.#loc[tagName];
          if (component !== undefined) return component;
          else return `<strong> TAG "${tagName}" NOT FOUND! </strong>`;
        });

        document.body.insertAdjacentHTML("beforeend", template);

        document.getElementById(scoreId).textContent = this.#score;
        document.getElementById(playAgainId).onclick = () => this.playAgainEvent.invoke();
        document.getElementById(backId).onclick = () => this.backEvent.invoke();
    }
  }

  createView(loc) {
    if (this.created) throw new Error("View already exists!");
    this.#created = true;
    this.#loc = loc;
    this.update();
  }

  removeView() {
    if (!this.created) throw new Error("View does not exists!");
    this.#created = false;
    document.body.textContent = "";
  }
}
