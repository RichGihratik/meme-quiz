import {
  galleryTemlate,
  prevId,
  nextId,
  audioClass,
  nameClass,
  themeClass,
  imgClass,
  originClass,
  descClass,
} from "../../../html/gallery.template";

import { AudioPlayerElement } from "../audio-player.element";

import { Event } from "./../../common/event";

export class GalleryView {
  #element = undefined;

  #item = undefined;

  #name = undefined;
  #theme = undefined;
  #img = undefined;
  #origin = undefined;
  #desc = undefined;

  nextEvent = new Event();
  prevEvent = new Event();

  audio = new AudioPlayerElement();

  set item(item) {
    this.#item = item;
    this.updateView();
  }

  get created() {
    return this.#element !== undefined;
  }

  createView(element, item) {
    if (this.#element !== undefined) throw new Error("View already created!");
    this.#element = element;
    this.#item = item;

    this.#element.textContent = "";
    this.#element.insertAdjacentHTML("beforeend", galleryTemlate);

    let prev = document.getElementById(prevId);

    prev.onclick = () => this.prevEvent.invoke();

    let next = document.getElementById(nextId);

    next.onclick = () => this.nextEvent.invoke();

    this.audio.createElement(this.#element.querySelector("." + audioClass));

    this.#desc = this.#element.querySelector("." + descClass);
    this.#name = this.#element.querySelector("." + nameClass);
    this.#theme = this.#element.querySelector("." + themeClass);
    this.#img = this.#element.querySelector("." + imgClass);
    this.#origin = this.#element.querySelector("." + originClass);

    this.updateView();
  }

  updateView() {
    if (this.#element !== undefined) {
      this.#desc.textContent = this.#item.desc;
      this.#name.textContent = this.#item.name;
      this.#theme.textContent = this.#item.theme;
      this.#origin.textContent = this.#item.origin;
      this.#img.src = this.#item.img;
      this.audio.url = this.#item.audio;
    }
  }

  removeView() {
    if (this.#element === undefined) throw new Error("View does not exist!");

    this.audio.removeElement();
    this.#item = undefined;

    this.#name = undefined;
    this.#theme = undefined;
    this.#img = undefined;
    this.#origin = undefined;
    this.#desc = undefined;

    this.#element.textContent = "";
    this.#element = undefined;
  }
}