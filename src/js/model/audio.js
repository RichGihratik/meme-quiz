import good from "../../assets/mp3/good.mp3";
import bad from "../../assets/mp3/bad.mp3";

export class AudioPlayer {
  #wrong = new Audio(bad);
  #right = new Audio(good);

  playRight() {
    this.#right.pause();
    this.#right = new Audio(good);
    this.#right.volume = 0.4;
    this.#right.play();
  }

  playWrong() {
    this.#wrong.pause();
    this.#wrong = new Audio(bad);
    this.#wrong.volume = 0.4;
    this.#wrong.play();
  }
}
