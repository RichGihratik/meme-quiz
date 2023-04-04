import { getRandomItems } from "../common/utils";
import { AudioQuestion } from "./question";

export class Quiz {
    #questions = [];

    #totalScore = 0;
    #index = 0;
    #currentQuestion = null;
    #currentQuestionHandler = null;

    #finished = false;

    get current() {
        return this.#currentQuestion;
    }

    get index() {
        return this.#index;
    }

    get totalScore() {
        return this.#totalScore;
    }

    get finished() {
        return this.#finished;
    }

    get themes() {
        let result = [];
        for (let item of this.#questions) result.push(item.theme);
        return result;
    }

    generateQuiz(data, questionsCount, answersCount) {
        let questionsData = getRandomItems(data, questionsCount);
        this.#questions = [];

        for (let item of questionsData) {
            this.#questions.push(new AudioQuestion(item.theme, item.data, answersCount));
        }

        this.#index = 0;

        this.#setCurrentQuestion();
        this.#totalScore = 0;
        this.#finished = false;
    }

    #questionAnsweredHandler() {
        this.#totalScore += this.#currentQuestion.score;
        this.#currentQuestion.questionAnswered.removeEventListener(
            this.#currentQuestionHandler
        );
        this.#currentQuestionHandler = null;
    }

    #setCurrentQuestion() {
        this.#currentQuestion = this.#questions[this.#index];
        let handler = () => this.#questionAnsweredHandler();
        this.#currentQuestion.questionAnswered.addEventListener(handler);
        this.#currentQuestionHandler = handler;
    }

    next() {
        if (this.#currentQuestion.isAnswered) {
            this.#index++;
            if (this.#questions.length !== this.#index) {
              this.#setCurrentQuestion();
            } else {
              this.#finished = true;
              this.#currentQuestion = null;
            }
        }
    }
}