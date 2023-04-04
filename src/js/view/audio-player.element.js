import {
  audioPlayerTemplate,
  audioClass,
  buttonClass,
  currentClass,
  iconClass,
  durationClass,
  playClass,
  pauseClass,
  volumeClass,
  seekbarClass,
} from "../../html/audio-player.template";

import { TimerElement } from './timer.element';

export class AudioPlayerElement {
  #element = undefined;
  #playButton = undefined;
  #icon = undefined;
  #seekBar = undefined;
  #volume = undefined;

  #duration = new TimerElement();
  #current = new TimerElement();
  #audio = undefined;

  #removed = true;

  get audio() {
    return this.#audio;
  }

  get removed() {
    return this.#element === undefined;
  }

  #seeking = true;

  createElement(element) {
    if (this.#element !== undefined)
      throw new Error("Audio player already created!");
    this.#element = element;
    element.textContent = "";
    element.classList.add(audioClass);

    element.insertAdjacentHTML("beforeend", audioPlayerTemplate);

    this.#duration.createElement(element.querySelector("." + durationClass));
    this.#current.createElement(element.querySelector("." + currentClass));

    this.#playButton = element.querySelector("." + buttonClass);
    this.#icon = element.querySelector("." + iconClass);
    this.#seekBar = element.querySelector("." + seekbarClass);
    this.#volume = element.querySelector("." + volumeClass);
    this.#duration.time = -1;
    this.#current.time = -1;
    this.#disable();

    this.#removed = false;

    this.#updateAudio();
  }

  removeElement() {
    if (this.#element === undefined)
      throw new Error("Audio player not created!");
    
    this.#removed = true
    if (this.#audio !== undefined) this.#audio.pause();
    this.#audio = undefined;
    this.#current.removeElement();
    this.#duration.removeElement();

    this.#playButton = undefined;
    this.#icon = undefined;
    this.#seekBar = undefined;
    this.#volume = undefined;
  
    this.#element.textContent = "";
    this.#element.classList.remove(audioClass);
    this.#element = undefined;
  }

  set url(url) {
    if (typeof url !== "string") throw new Error("Incorrect type!");
    if (this.#audio !== undefined) this.#audio.pause();
    this.#audio = new Audio(url);
    this.#updateAudio();
  }

  #updateAudio() {
    if (this.#audio !== undefined) {
      this.#duration.time = -1;
      this.#current.time = -1;
      this.#disable();

      this.#playButton.onclick = () => this.#btnClick();
      this.#audio.onplay = () => this.#played();
      this.#audio.onpause = () => this.#paused();
      this.#audio.onloadedmetadata = () => this.#loadedMeta();
      this.#audio.oncanplaythrough = () => this.#canPlayThrough();
      this.#audio.onwaiting = () => this.#disable();
      this.#audio.onended = () => this.#ended();

      this.#volume.onchange = () => { this.#audio.volume = this.#volume.value; };
    }
  }

  //#region EVENTS 

  #btnClick() {
    if (this.#removed || this.#audio === undefined) return;
    if (this.#audio.paused) this.#audio.play();
    else this.#audio.pause();
  }

  #canPlayThrough() {
    if (this.#removed || this.#audio === undefined) return;
    this.#playButton.disabled = false;
    this.#seekBar.disabled = false;
    this.#volume.disabled = false;
  }

  #disable() {
    if (this.#removed) return;
    this.#playButton.disabled = true;
    this.#seekBar.disabled = true;
    this.#volume.disabled = true;
  }

  #paused() {
    if (this.#removed || this.#audio === undefined) return;
    this.#icon.classList.remove(pauseClass);
    this.#icon.classList.add(playClass);
  }

  #played() {
    if (this.#removed || this.#audio === undefined) return;
    this.#icon.classList.remove(playClass);
    this.#icon.classList.add(pauseClass);
  }

  #loadedMeta() {
    if (this.#removed || this.#audio === undefined) return;
    this.#current.time = 0;
    this.#duration.time = this.#audio.duration;
    this.#seekBar.max = this.#audio.duration;
    this.#seeking = false;

    this.#seekBar.oninput = () => { this.#seeking = true };

    this.#seekBar.onchange = () => this.#seekUpdate();

    this.#audio.ontimeupdate = () => this.#timeUpdate();
  }

  #timeUpdate() {
    if (this.#removed || this.#audio === undefined) return;
    if (!this.#seeking) {
      this.#seekBar.value = Math.floor(this.#audio.currentTime * 1000) / 1000;
    }
    this.#current.time = this.#audio.currentTime;
  }

  #seekUpdate() {
    if (this.#removed || this.#audio === undefined) return;
    this.#audio.currentTime = this.#seekBar.value;
    if (!this.#audio.paused) {
      this.#audio.play();
    }
    this.#seeking = false;
  }

  #ended() {
    if (this.#removed || this.#audio === undefined) return;
    this.#seekBar.value = 0;
  }
  //#endregion
}