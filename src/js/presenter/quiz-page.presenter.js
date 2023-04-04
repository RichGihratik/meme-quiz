import { Event } from "../common/event";

export class QuizPagePresenter {
  #model = undefined;
  #view = undefined;

  init(model, view) {
    this.#model = model;
    this.#view = view;

    this.#view.langBtnClickEvent.addEventListener(() => {
      this.#model.toggleLang();
      this.render();
    });

    this.#view.nextBtnClickEvent.addEventListener(() => {
      this.#model.next();
      if (!this.#model.finished) {
        this.#view.score = this.#model.score;
        this.#answered = false;
        this.#view.question = this.#model.quizData;
        this.#view.updateAudio();
      }
      else this.quizEndEvent.invoke(); 
    });

    this.#view.answerClickEvent.addEventListener((index) => {
      this.#model.answer(index);
      if (!this.#model.finished) {
        this.#view.score = this.#model.score;
        let data = this.#model.quizData;
        this.#view.question = data;
        if (!this.#answered) {
          if (data.realAnswer !== undefined) {
            this.#answered = true;
            this.#view.updateAudio();
          }
        }
      }
    });
  }

  #answered = false;

  quizEndEvent = new Event();

  start() {
    this.#model.startQuiz();
    this.render();
  }

  render() {
    let data = this.#model.quizData;

    if (!this.#model.finished) {
      if (!this.#view.created) {
        this.#view.createView(
          this.#model.loc,
          this.#model.quizData,
          this.#model.lang
        );
      } else
        this.#view.setLocalisation(
          this.#model.loc,
          this.#model.quizData,
          this.#model.lang
        );
      this.#view.score = this.#model.score;
      this.#view.updateAudio();
    }
    else this.quizEndEvent.invoke();
    
  }

  hide() {
    this.#view.removeView();
  }
}
