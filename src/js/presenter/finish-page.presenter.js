export class FinishPagePresenter {
  #model = undefined;
  #view = undefined;

  get playAgainEvent() {
    return this.#view.playAgainEvent;
  }

  get backEvent() {
    return this.#view.backEvent;
  }

  init(model, view) {
    this.#model = model;
    this.#view = view;
  }

  render() {
    this.#view.createView(this.#model.loc);
    this.#view.score = this.#model.score;
  }

  hide() {
    this.#view.removeView();
  }
}