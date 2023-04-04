import { MainPagePresenter } from "./main-page.presenter";
import { QuizPagePresenter } from "./quiz-page.presenter";
import { FinishPagePresenter } from "./finish-page.presenter";

import { MainPageView } from "../view/main/main-page.view";
import { QuizPageView } from "../view/quiz/quiz-page.view";
import { FinishView } from "../view/finish.view";

export class AppPresenter {
    #main = new MainPagePresenter();
    #quiz = new QuizPagePresenter();
    #finish = new FinishPagePresenter();

    init(model) {
        this.#main.init(model.mainModel, new MainPageView());
        this.#quiz.init(model.quizModel, new QuizPageView());
        this.#finish.init(model.finishModel, new FinishView());

        this.#main.startEvent.addEventListener(() => {
            this.#quiz.start();
        });

        this.#quiz.quizEndEvent.addEventListener(() => {
            this.#quiz.hide();
            this.#finish.render();
        })

        this.#finish.playAgainEvent.addEventListener(() => {
            this.#finish.hide();
            this.#quiz.start();
        });

        this.#finish.backEvent.addEventListener(() => {
            this.#finish.hide();
            this.#main.render();
        });

        this.#main.render();
    }
}