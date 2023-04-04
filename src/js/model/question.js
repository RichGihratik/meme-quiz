import { getRandomItems } from "../common/utils";
import { Event } from "../common/event";

export const audioField = 'audio';

export class AudioQuestion {
    #answers = [];
    #isAnswered = false;

    #questionItem = undefined;

    #score = 0;

    #theme = '';

    constructor(theme, answers, count) {
        this.#selectRandomQuestion(answers, count);
        this.#score = count - 1;
        this.#theme = theme;
    }

    #questionAnsweredEvent = new Event();

    get questionAnswered() {
        return this.#questionAnsweredEvent;
    }

    get theme() {
        return this.#theme;
    }

    #selectRandomQuestion(answers, count) {
        if (!Array.isArray(answers)) 
            throw new TypeError(`Invalid type (expected Array, got ${typeof answers})!`);
        this.#answers = [];
        for (let answer of getRandomItems(answers, count)) {
            this.#answers.push({ ...answer });
        };
        
        let randomIndex = Math.floor(Math.random() * this.#answers.length);
        this.#questionItem = this.#answers[randomIndex];
    }

    get isAnswered() {
        return this.#isAnswered;
    }

    get question() {
        return this.#questionItem[audioField];
    }

    get realAnswer() {
        if (this.#isAnswered) return this.#questionItem;
        else return null;
    }

    get answers() {
        return [...this.#answers];
    }

    get score() {
        return this.#score;
    }

    #pickedAnswer = undefined;

    get pickedAnswer() {
        return this.#pickedAnswer;
    }
    
    answer(index) {
        let answer = this.#answers[index];
        if (!this.#isAnswered) {
            this.#isAnswered = this.#questionItem === answer;
            if (this.#isAnswered) this.#questionAnsweredEvent.invoke();
            
            if (answer.isCorrect === undefined ) {
              answer.isCorrect = this.#isAnswered;
              if (!this.#isAnswered) this.#score--;
            }
        } 
        this.#pickedAnswer = this.#answers[index];
        return { ...this.#answers[index] };
    }
}