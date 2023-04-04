import {
  className,
  answerTemplate,
  answerPlaceholderTemplate,
  themeDescClass,
  imgClass,
  originClass,
  nameClass,
  descClass,
  audioId,
} from "../../../html/answer.template";

import { AudioPlayerElement } from '../audio-player.element';

export class AnswerView {
  #element = undefined;

  #answer = undefined;

  set answer(answer) {
    this.#answer = answer;
    this.update();
  }

  get created() {
    return this.#element !== undefined;
  }

  set themeDesc(desc) {
    this.#themeDesc = desc;
    this.update();
  }

  #themeDesc = "";

  #audio = new AudioPlayerElement();

  update() {
    if (this.#element !== undefined) {
      if (this.#answer !== undefined) {
        if (!this.#audio.removed) this.#audio.removeElement();
        this.#element.textContent = "";
        this.#element.insertAdjacentHTML("beforeend", answerTemplate);
        this.#audio.createElement(document.getElementById(audioId));
        this.#audio.url = this.#answer.audio;
        this.#element.querySelector("." + imgClass).src = this.#answer.img;
        this.#element.querySelector("." + originClass).textContent =
          this.#answer.origin;
        this.#element.querySelector("." + nameClass).textContent =
          this.#answer.name;
        this.#element.querySelector("." + descClass).textContent =
          this.#answer.desc;
      } else {
        if (!this.#audio.removed) this.#audio.removeElement();
        this.#element.textContent = "";
        this.#element.insertAdjacentHTML(
          "beforeend",
          answerPlaceholderTemplate
        );
        this.#element.querySelector("." + themeDescClass).textContent =
          this.#themeDesc;
      }
    }
  }

  createView(element, themeDesc) {
    if (this.#element !== undefined) throw new Error("View already exists!");
    this.#element = element;
    element.textContent = "";
    element.classList.add(className);
    this.#themeDesc = themeDesc;

    this.update();
  }

  removeView() {
    if (this.#element === undefined) throw new Error("View does not exists!");
    this.#element.classList.remove(className);
    if (!this.#audio.removed) this.#audio.removeElement();
    this.#element.textContent = "";
    this.#element = undefined;
  }
}