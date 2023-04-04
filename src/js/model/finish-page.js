export class FinishPageModel {
    #loc = undefined;
    #quizPage = undefined;

    init(loc, quizPage) {
        this.#quizPage = quizPage;
        this.#loc = loc;
    }

    get loc() {
        return this.#loc.getFinishLoc();
    }

    get score() {
        return this.#quizPage.score;
    }
}