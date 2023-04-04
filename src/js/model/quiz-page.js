import { Quiz } from "./quiz";

const themes = [0, 1, 2, 3, 4, 5];

export class QuizPageModel {
    #quiz = new Quiz();

    #dataSource = undefined;
    #loc = undefined;
    #audio = undefined;

    #data = [];

    init(dataSource, loc, audio) {
        this.#loc = loc;
        this.#dataSource = dataSource;
        this.#audio = audio;
    }

    selectAnswersByTheme(id) {
        if (id === 5) return this.#data;

        let result = [];

        for (let item of this.#data)
            if (item.theme === id) 
                result.push(item);

        return result;
    }

    startQuiz() {
        this.#data = this.#dataSource.getQuizData();

        let quizData = [];

        for (let theme of themes) {
            quizData.push({
              theme: theme,
              data: this.selectAnswersByTheme(theme),
            });
        }

        this.#quiz.generateQuiz(quizData, themes.length, 6);
    }

    answer(index) {
        let answered = this.#quiz.current.isAnswered;
        let answer = this.#quiz.current.answer(index);
        if (!answered) {
            if (answer.isCorrect) {
                this.#audio.playRight();
            }
            else {
                this.#audio.playWrong();
            }
        }
    }

    toggleLang() {
        this.#loc.toggleLang();
    }

    next() {
        this.#quiz.next();
    }

    get loc() {
        return this.#loc.getQuizLoc();
    }

    get score() {
        return this.#quiz.totalScore;
    }

    get finished() {
        return this.#quiz.finished;
    }

    get lang() {
        return this.#loc.lang;
    }

    get quizData() {
        if (!this.#quiz.finished) {

            let locAnswerArray = [];

            if (this.#quiz.current.pickedAnswer != undefined)
              locAnswerArray.push(this.#quiz.current.pickedAnswer);
            if (this.#quiz.current.realAnswer != null)
              locAnswerArray.push(this.#quiz.current.realAnswer);

            locAnswerArray.push(...this.#quiz.current.answers);
            locAnswerArray = this.#loc.applyLocToAnswers(locAnswerArray);

            return {
              index: this.#quiz.index,
              themes: this.#loc.applyLocToThemes(this.#quiz.themes),
              pickedAnswer:
                this.#quiz.current.pickedAnswer !=
                undefined ? locAnswerArray.shift() : undefined,
              realAnswer: this.#quiz.current.realAnswer !=
                undefined ? locAnswerArray.shift() : undefined,
              question: this.#quiz.current.question,
              answers: locAnswerArray,
            };
        }
    }
}