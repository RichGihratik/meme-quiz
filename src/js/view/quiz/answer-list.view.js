import {
  answerListTemplate,
  className,
  btnClass,
  wrongClass,
  rightClass,
  listClass
} from "../../../html/answer-list.template";

import {
    Event
} from "../../common/event";

export class AnswerListView {
  #element = undefined;
  #answerList = [];

  answerSelected = new Event();

  get created() {
    return this.#element !== undefined;
  }

  set answers(answers) {
    this.#answerList = answers;
    this.update();
  }

  createView(element, answers) {
    if (this.#element !== undefined) throw new Error("View already exists!");
    this.#element = element;
    element.classList.add(className);
    this.#answerList = answers;

    this.update();
  }

  update() {
    if (this.#element !== undefined) {
      this.#element.textContent = "";

      this.#element.insertAdjacentHTML("beforeend", answerListTemplate);

      let list = this.#element.querySelector("." + listClass);
      let index = 0;
      for (let answer of this.#answerList) {
        let btn = document.createElement("button");
        btn.classList.add(...btnClass.split(" "));

        btn.textContent = answer.origin;
        if (answer.isCorrect !== undefined) {
          if (answer.isCorrect) btn.classList.add(rightClass);
          else btn.classList.add(wrongClass);
        }
        let subIndex = index;
        btn.onclick = () => {
          this.answerSelected.invoke(subIndex);
        };
        index++;
        list.appendChild(btn);
      }
    }
  }

  removeView() {
    if (this.#element === undefined) throw new Error("View does not exists!");
    this.#element.classList.remove(className);
    this.#element.textContent = "";
    this.#element = undefined;
  }
}