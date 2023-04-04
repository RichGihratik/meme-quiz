import {
  timerTemplate,
  className,
  minutesClass,
  secondsClass,
} from "../../html/timer.template";

function singleNumTimeFormat(number) {
    return number < 10 ? '0' + String(number) : String(number);
}

export class TimerElement {
  #element = undefined;
  #seconds = 0;

  #minutesElem = undefined;
  #secondsElem = undefined;

  get minutes() {
    if (this.#seconds >= 0) return singleNumTimeFormat(Math.floor(this.#seconds / 60));
    return '--';
  }

  get seconds() {
    if (this.#seconds >= 0) return singleNumTimeFormat(Math.floor(this.#seconds % 60));
    return "--";
  }

  createElement(element) {
    if (this.#element !== undefined) throw new Error("Timer already created!");
    this.#element = element;
    element.textContent = "";
    element.classList.add(className);

    element.insertAdjacentHTML("beforeend", timerTemplate);

    this.#minutesElem = this.#element.querySelector("." + minutesClass);
    this.#secondsElem = this.#element.querySelector("." + secondsClass);

    this.updateElement();
  }

  removeElement() {
    if (this.#element === undefined) throw new Error("Timer not exist!");

    this.#element.textContent = "";
    this.#element.classList.remove(className);    

    this.#minutesElem = undefined;
    this.#secondsElem = undefined;
    this.#seconds = 0;
    this.#element = undefined;
  }

  get time() {
    return this.#seconds;
  }

  /**
     * @param {number} seconds
     */
  set time(seconds) {
    if (typeof seconds !== "number")
      throw new Error(`Invalid value! (${seconds})`);
    this.#seconds = seconds;
    this.updateElement();
  }

  updateElement() {
    this.#minutesElem.textContent = this.minutes;
    this.#secondsElem.textContent = this.seconds;
  }
}
