import {
  questionTemplate,
  questionNameClass,
  questionAudioId,
  questionImgClass,
  className
} from "../../../html/question.template";

import { AudioPlayerElement } from "../audio-player.element";

export class QuestionView {
  #img = "https://i.ytimg.com/vi/ulkKKtzfgFA/maxresdefault.jpg";
  #name = "***";
  #element = undefined;
  #audio = new AudioPlayerElement();

  set audio(url) {
    this.#audio.url = url;
  }

  get created() {
    return this.#element !== undefined;
  }

  set img(url) {
    if (url === "" || url === undefined) {
      this.#img = "https://i.ytimg.com/vi/ulkKKtzfgFA/maxresdefault.jpg";
    } else this.#img = url;
    this.update();
  }

  set name(name) {
    if (name === "" || name === undefined) {
      this.#name = "***";
    } else this.#name = name;
    this.update();
  }

  createView(element, url) {
    if (this.#element !== undefined) throw new Error("View already exists!");
    this.#element = element;
    element.classList.add(className);
    element.textContent = "";
    element.insertAdjacentHTML("beforeend", questionTemplate);
    this.#audio.createElement(document.getElementById(questionAudioId));
    this.#audio.url = url;
    this.update();
  }

  update() {
    if (this.#element !== undefined) {
      this.#element.querySelector("." + questionNameClass).textContent =
        this.#name;
      this.#element.querySelector("." + questionImgClass).src = this.#img;
    }
  }

  removeView() {
    if (this.#element === undefined) throw new Error("View does not exists!");

    this.#audio.removeElement();
    this.#element.classList.remove(className);
    this.#element.textContent = "";
    this.#element = undefined;
  }

  pause() {
    this.#audio.audio.pause();
  }
}