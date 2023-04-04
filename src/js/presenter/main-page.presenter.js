import { Event } from "../common/event";

export class MainPagePresenter {
  #model = undefined;
  #view = undefined;

  #items = [];
  #current = 0;

  init(model, view) {
    this.#model = model;
    this.#view = view;

    this.#view.langBtnClickEvent.addEventListener(() => {
      this.#model.toggleLang();
      this.render();
    });

    this.#view.tabMap.gallery.view.nextEvent.addEventListener(
      () => this.next()
    );
    this.#view.tabMap.gallery.view.prevEvent.addEventListener(
      () => this.prev()
    );

    this.#view.tabMap.game.view.startEvent.addEventListener(() => {
      this.hide();
      this.#view.playAnim();
      setTimeout(() => {
        this.#view.stopAnim();
        this.startEvent.invoke();
      }, 2500);
    });
  }

  startEvent = new Event();

  render() {
    this.#items = this.#model.getGallery();

    if (!this.#view.created) {
      this.#view.createView(
        this.#model.getLoc(),
        this.current,
        this.#model.getLang()
      );
    }
    else this.#view.setLocalisation(
      this.#model.getLoc(),
      this.current,
      this.#model.getLang()
    );
  }

  hide() {
    this.#view.removeView();
  }

  next() {
    if (this.#current + 1 <= this.#items.length - 1) {
      ++this.#current;
      this.#view.item = this.current;
    }
  }

  prev() {
    if (this.#current - 1 >= 0) {
      --this.#current;
      this.#view.item = this.current;
    }
  }

  get current() {
    return this.#items[this.#current];
  }
}
